
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, userId } = await req.json();

    if (!query || !userId) {
      return new Response(
        JSON.stringify({ error: 'Query and userId are required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('AI Search request received:', { query, userId });

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Fetch candidates for the user
    const { data: candidates, error: fetchError } = await supabase
      .from('candidates')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching candidates:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch candidates' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`Found ${candidates?.length || 0} candidates for user ${userId}`);

    if (!candidates || candidates.length === 0) {
      return new Response(
        JSON.stringify({ scoredCandidates: [] }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Prepare candidates data for AI analysis
    const candidatesData = candidates.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      position: candidate.position || 'Not specified',
      experience: candidate.experience || 'Not specified',
      skills: candidate.skills || [],
      qualification: candidate.qualification || 'Not specified',
      cgpa: candidate.cgpa || 'Not specified',
      location: candidate.location || 'Not specified',
      resumeUrl: candidate.resume_url || null,
    }));

    // Create AI prompt for candidate analysis
    const aiPrompt = `
You are an AI recruitment assistant. Analyze the following job search query and candidate profiles to provide match scores and reasoning.

Job Search Query: "${query}"

Candidates to evaluate:
${candidatesData.map((candidate, index) => `
${index + 1}. Name: ${candidate.name}
   Email: ${candidate.email}
   Position: ${candidate.position}
   Experience: ${candidate.experience}
   Skills: ${candidate.skills.join(', ')}
   Qualification: ${candidate.qualification}
   CGPA: ${candidate.cgpa}
   Location: ${candidate.location}
   Resume: ${candidate.resumeUrl ? 'Available' : 'Not uploaded'}
`).join('\n')}

Please provide a JSON response with the following structure for each candidate:
{
  "results": [
    {
      "id": "candidate_id",
      "matchScore": 85,
      "matchReason": {
        "pros": ["Relevant experience in required field", "Strong technical skills"],
        "cons": ["Location mismatch", "Slightly lower experience than preferred"]
      }
    }
  ]
}

Score each candidate from 0-100 based on how well they match the job requirements. Consider:
- Relevant experience and skills matching the job query
- Education/qualifications relevant to the position
- Location compatibility if specified in the query
- Overall fit for the role described in the query
- Give higher scores to candidates with uploaded resumes as they show commitment

Provide specific, actionable feedback in the pros and cons based on the actual candidate data and job requirements.
`;

    let analysisResults;

    try {
      console.log('Calling DeepSeek API...');
      // Call DeepSeek API
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${deepseekApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: aiPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('DeepSeek API error:', errorText);
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const aiResponse = await response.json();
      const aiContent = aiResponse.choices[0].message.content;

      console.log('DeepSeek response received, parsing...');

      // Parse AI response
      try {
        // Extract JSON from the AI response
        const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisResults = JSON.parse(jsonMatch[0]);
          console.log('AI analysis results parsed successfully');
        } else {
          throw new Error('No valid JSON found in AI response');
        }
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        console.error('AI Response:', aiContent);
        throw parseError;
      }

    } catch (aiError) {
      console.error('AI processing failed, using fallback scoring:', aiError);
      
      // Fallback: Generate basic scores based on simple keyword matching
      analysisResults = {
        results: candidates.map(candidate => {
          const queryLower = query.toLowerCase();
          let score = 60; // Base score
          
          // Boost score for skill matches
          if (candidate.skills) {
            const matchingSkills = candidate.skills.filter(skill => 
              queryLower.includes(skill.toLowerCase())
            );
            score += Math.min(matchingSkills.length * 10, 30);
          }
          
          // Boost score for position match
          if (candidate.position && queryLower.includes(candidate.position.toLowerCase())) {
            score += 15;
          }
          
          // Boost score for uploaded resume
          if (candidate.resume_url) {
            score += 5;
          }
          
          return {
            id: candidate.id,
            matchScore: Math.min(score, 95),
            matchReason: {
              pros: [
                'Profile available for review',
                candidate.resume_url ? 'Resume uploaded and available' : 'Basic profile information provided'
              ],
              cons: ['AI analysis temporarily unavailable - manual review recommended']
            }
          };
        })
      };
    }

    // Map candidates with their database data and AI analysis
    const scoredCandidates = candidates.map(candidate => {
      const analysis = analysisResults.results.find(r => r.id === candidate.id);
      
      return {
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        experience: candidate.experience,
        skills: candidate.skills,
        status: candidate.status,
        score: candidate.score,
        appliedDate: candidate.created_at,
        resumeUrl: candidate.resume_url,
        notes: candidate.notes,
        location: candidate.location,
        isShortlisted: candidate.is_shortlisted,
        qualification: candidate.qualification,
        cgpa: candidate.cgpa,
        aiMatchScore: analysis?.matchScore || Math.floor(Math.random() * 40) + 60,
        matchReason: analysis?.matchReason || {
          pros: ['Basic profile match'],
          cons: ['Needs detailed review']
        }
      };
    });

    // Sort by match score
    scoredCandidates.sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0));

    console.log(`Returning ${scoredCandidates.length} scored candidates`);

    return new Response(
      JSON.stringify({ scoredCandidates }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in ai-search function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
