# AI-BASED-RESUME-SCREEING-SYSTEM

This project addresses the challenges of traditional recruitment by automating resume screening and candidate evaluation. The AI-Powered Resume Screening System transforms manual, time-consuming, and biased processes into an intelligent, data-driven workflow.

## Features

- **AI-Powered Resume Analysis**: Automated screening using advanced AI algorithms
- **Candidate Management**: Comprehensive dashboard for managing candidates
- **Analytics & Insights**: Detailed analytics and reporting capabilities
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Real-time Updates**: Live data synchronization with Supabase
- **Responsive Design**: Works seamlessly across all devices

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Real-time)
- **Charts**: Recharts for data visualization
- **State Management**: React Context API
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/karthikrm04/AI-BASED-RESUME-SCREEING-SYSTEM.git
cd AI-BASED-RESUME-SCREEING-SYSTEM
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Feature-specific components
├── pages/              # Application pages
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── integrations/       # External service integrations
│   └── supabase/       # Supabase configuration
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue in the GitHub repository.
