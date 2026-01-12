'use client';

import { useState } from 'react';
import Section1Challenge from '@/components/Section1Challenge';
import Section2Solution from '@/components/Section2Solution';
import Section3Hardware from '@/components/Section3Hardware';
import Section4Analytics from '@/components/Section4Analytics';
import Section5Scenarios from '@/components/Section5Scenarios';
import Section6Pitches from '@/components/Section6Pitches';
import Section7Assessment from '@/components/Section7Assessment';
import ProgressBar from '@/components/ProgressBar';
import PresentationMode from '@/components/PresentationMode';

const sections = [
  { id: 1, title: 'The Food Distribution Challenge', duration: '5-6 min' },
  { id: 2, title: 'The myQ Enterprise Solution', duration: '6-7 min' },
  { id: 3, title: 'The IoT Hardware Foundation', duration: '5-6 min' },
  { id: 4, title: 'The Analytics Dashboard', duration: '4-5 min' },
  { id: 5, title: 'Scenario Challenges', duration: '8-10 min' },
  { id: 6, title: 'Stakeholder Pitches', duration: '3-4 min' },
  { id: 7, title: 'Final Assessment', duration: '3-4 min' },
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [presentationMode, setPresentationMode] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);

  const handleSectionComplete = (sectionId: number) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length) {
      handleSectionComplete(currentSection);
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleJumpToSection = (index: number) => {
    setCurrentSection(index);
  };

  if (presentationMode) {
    return (
      <PresentationMode 
        onExit={() => setPresentationMode(false)} 
      />
    );
  }

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <WelcomeScreen onStart={() => setCurrentSection(1)} onPresent={() => setPresentationMode(true)} />;
      case 1:
        return <Section1Challenge onComplete={() => handleSectionComplete(1)} />;
      case 2:
        return <Section2Solution onComplete={() => handleSectionComplete(2)} />;
      case 3:
        return <Section3Hardware onComplete={() => handleSectionComplete(3)} />;
      case 4:
        return <Section4Analytics onComplete={() => handleSectionComplete(4)} />;
      case 5:
        return <Section5Scenarios onComplete={() => handleSectionComplete(5)} />;
      case 6:
        return <Section6Pitches onComplete={() => handleSectionComplete(6)} />;
      case 7:
        return <Section7Assessment onComplete={(score) => { handleSectionComplete(7); setAssessmentScore(score); }} />;
      default:
        return <CompletionScreen score={assessmentScore} onRestart={() => { setCurrentSection(0); setCompletedSections([]); setAssessmentScore(null); }} />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {currentSection > 0 && currentSection <= sections.length && (
        <ProgressBar 
          sections={sections}
          currentSection={currentSection}
          completedSections={completedSections}
          onJumpToSection={handleJumpToSection}
        />
      )}
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {renderSection()}
        
        {currentSection > 0 && currentSection <= sections.length && (
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={handlePrevious}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <button
              onClick={() => setPresentationMode(true)}
              className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Present
            </button>
            
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {currentSection === sections.length ? 'Finish' : 'Next'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function WelcomeScreen({ onStart, onPresent }: { onStart: () => void; onPresent: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          myQ Enterprise
        </h1>
        <p className="text-xl text-blue-400 mb-2">Sales Training Module</p>
        <p className="text-lg text-slate-400">Food Distribution & Cold Chain Operations</p>
      </div>
      
      <div className="bg-slate-800/50 rounded-2xl p-8 max-w-2xl mx-auto mb-8 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">What You'll Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-slate-300">Food distribution pain points</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-slate-300">The 4-pillar solution architecture</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-slate-300">IoT hardware & sensor ecosystem</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-slate-300">Real-world scenario handling</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-slate-300">ROI business case building</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-slate-300">Stakeholder-specific pitches</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onStart}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          Start Training
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <button
          onClick={onPresent}
          className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Presentation Mode
        </button>
      </div>
      
      <p className="text-slate-500 mt-8">
        Estimated time: 25-30 minutes • Works on iPad & Desktop
      </p>
    </div>
  );
}

function CompletionScreen({ score, onRestart }: { score: number | null; onRestart: () => void }) {
  const passed = score !== null && score >= 70;
  
  return (
    <div className="text-center py-16">
      <div className="mb-8">
        {passed ? (
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-600 rounded-full mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        ) : (
          <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-600 rounded-full mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        )}
        
        <h1 className="text-4xl font-bold text-white mb-4">
          {passed ? 'Congratulations!' : 'Almost There!'}
        </h1>
        
        {score !== null && (
          <div className="text-6xl font-bold mb-4" style={{ color: passed ? '#22c55e' : '#f59e0b' }}>
            {score}%
          </div>
        )}
        
        <p className="text-xl text-slate-300 mb-8">
          {passed 
            ? "You've completed the myQ Enterprise Sales Training for Food Distribution."
            : "You need 70% to pass. Review the material and try again."
          }
        </p>
      </div>
      
      {passed && (
        <div className="bg-slate-800/50 rounded-2xl p-8 max-w-xl mx-auto mb-8 border border-green-500/30">
          <h2 className="text-xl font-semibold text-white mb-4">🎓 Certificate Earned</h2>
          <p className="text-slate-300 mb-4">myQ Enterprise Sales Certification</p>
          <p className="text-slate-400 text-sm">Food Distribution & Cold Chain Operations</p>
        </div>
      )}
      
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold rounded-xl transition-colors"
      >
        {passed ? 'Restart Training' : 'Try Again'}
      </button>
    </div>
  );
}
