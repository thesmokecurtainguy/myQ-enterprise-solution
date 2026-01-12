'use client';

interface Section {
  id: number;
  title: string;
  duration: string;
}

interface ProgressBarProps {
  sections: Section[];
  currentSection: number;
  completedSections: number[];
  onJumpToSection: (index: number) => void;
}

export default function ProgressBar({ 
  sections, 
  currentSection, 
  completedSections,
  onJumpToSection 
}: ProgressBarProps) {
  const progress = (completedSections.length / sections.length) * 100;
  
  return (
    <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4 py-3 max-w-5xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-blue-400 font-semibold">myQ Training</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 text-sm">
              Section {currentSection} of {sections.length}
            </span>
          </div>
          <span className="text-slate-400 text-sm">
            {Math.round(progress)}% Complete
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Section pills */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {sections.map((section, index) => {
            const sectionNum = index + 1;
            const isCompleted = completedSections.includes(sectionNum);
            const isCurrent = currentSection === sectionNum;
            
            return (
              <button
                key={section.id}
                onClick={() => onJumpToSection(sectionNum)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all
                  ${isCurrent 
                    ? 'bg-blue-600 text-white' 
                    : isCompleted 
                      ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }
                `}
              >
                {isCompleted && !isCurrent && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                <span>{sectionNum}. {section.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
