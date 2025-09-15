
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { Candidate } from '../types/candidate';
import { useAuth } from '../contexts/AuthContext';

export const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCandidates();
    } else {
      setCandidates([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchCandidates = async (): Promise<void> => {
    if (!user) {
      console.log('No user available for fetching candidates');
      setCandidates([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('Fetching candidates for user:', user.id);
      
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching candidates:', error);
        throw error;
      }

      console.log('Fetched candidates data:', data);

      const mappedCandidates: Candidate[] = data?.map(candidate => ({
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone || '',
        position: candidate.position || '',
        experience: candidate.experience || '',
        skills: candidate.skills || [],
        status: candidate.status as 'pending' | 'approved' | 'rejected',
        score: candidate.score || 0,
        resumeUrl: candidate.resume_url,
        appliedDate: candidate.created_at,
        notes: candidate.notes,
        location: candidate.location,
        isShortlisted: candidate.is_shortlisted || false,
        qualification: candidate.qualification,
        cgpa: candidate.cgpa
      })) || [];

      console.log('Mapped candidates:', mappedCandidates);
      setCandidates(mappedCandidates);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setCandidates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addCandidate = async (newCandidates: Candidate | Candidate[]): Promise<void> => {
    if (!user) {
      console.error('No user available for adding candidates');
      throw new Error('User not authenticated');
    }

    try {
      console.log('Adding candidates for user:', user.id);
      const candidatesToAdd = Array.isArray(newCandidates) ? newCandidates : [newCandidates];
      
      const supabaseCandidates = candidatesToAdd.map(candidate => ({
        user_id: user.id,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        position: candidate.position,
        experience: candidate.experience,
        skills: candidate.skills,
        status: candidate.status,
        score: candidate.score,
        resume_url: candidate.resumeUrl,
        notes: candidate.notes,
        location: candidate.location,
        is_shortlisted: candidate.isShortlisted || false,
        qualification: candidate.qualification,
        cgpa: candidate.cgpa
      }));

      console.log('Inserting candidates:', supabaseCandidates);

      const { error } = await supabase
        .from('candidates')
        .insert(supabaseCandidates);

      if (error) {
        console.error('Database insert error:', error);
        throw error;
      }

      console.log('Candidates added successfully, refreshing list');
      // Refresh the candidates list
      await fetchCandidates();
    } catch (error) {
      console.error('Error adding candidates:', error);
      throw error;
    }
  };

  const updateCandidate = async (id: string, updates: Partial<Candidate>): Promise<void> => {
    if (!user) {
      console.error('No user available for updating candidate');
      throw new Error('User not authenticated');
    }

    try {
      console.log('Updating candidate:', id, 'with updates:', updates);
      
      const supabaseUpdates = {
        ...(updates.name && { name: updates.name }),
        ...(updates.email && { email: updates.email }),
        ...(updates.phone !== undefined && { phone: updates.phone }),
        ...(updates.position !== undefined && { position: updates.position }),
        ...(updates.experience !== undefined && { experience: updates.experience }),
        ...(updates.skills && { skills: updates.skills }),
        ...(updates.status && { status: updates.status }),
        ...(updates.score !== undefined && { score: updates.score }),
        ...(updates.resumeUrl !== undefined && { resume_url: updates.resumeUrl }),
        ...(updates.notes !== undefined && { notes: updates.notes }),
        ...(updates.location !== undefined && { location: updates.location }),
        ...(updates.isShortlisted !== undefined && { is_shortlisted: updates.isShortlisted }),
        ...(updates.qualification !== undefined && { qualification: updates.qualification }),
        ...(updates.cgpa !== undefined && { cgpa: updates.cgpa })
      };

      const { error } = await supabase
        .from('candidates')
        .update(supabaseUpdates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Database update error:', error);
        throw error;
      }

      console.log('Candidate updated successfully, refreshing list');
      // Refresh the candidates list
      await fetchCandidates();
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }
  };

  const deleteCandidate = async (id: string): Promise<void> => {
    if (!user) {
      console.error('No user available for deleting candidate');
      throw new Error('User not authenticated');
    }

    try {
      console.log('Deleting candidate:', id);
      
      const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Database delete error:', error);
        throw error;
      }

      console.log('Candidate deleted successfully, refreshing list');
      // Refresh the candidates list
      await fetchCandidates();
    } catch (error) {
      console.error('Error deleting candidate:', error);
      throw error;
    }
  };

  return {
    candidates,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    isLoading,
    refetch: fetchCandidates
  };
};
