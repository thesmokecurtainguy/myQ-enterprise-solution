'use client';

import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

interface Section4Props {
  onComplete: () => void;
}

const dashboardViews = [
  {
    id: 'realtime',
    name: 'Real-Time Activity',
    description: 'Live view of all dock positions with color-coded status indicators',
    features: [
      'Current status of each dock (available, loading, approaching limit, in detention)',
      'Live truck-at-dock session timestamps',
      'Color-coded alerts for inefficiencies or safety concerns',
      'Click any dock for detailed session information',
    ],
    imageId: 'IMG-06',
    imageDesc: 'Real-time dock status grid',
    imageSource: 'iDockLinkandmyQBrochure.pdf (page 2) - dock positions dashboard',
  },
  {
    id: 'detention',
    name: 'Detention Fee Tracking',
    description: 'Compare and manage detention costs by carrier, dock, or date',
    features: [
      'Total detention fees by carrier (horizontal bar chart)',
      'Identify problem carriers vs. problem docks',
      'Drill down to individual sessions',
      'Export data for carrier negotiations',
    ],
    imageId: 'IMG-07',
    imageDesc: 'Carrier Detention Costs bar chart',
    imageSource: 'iDockLinkandmyQBrochure.pdf (page 2) - detention fees chart',
  },
  {
    id: 'heatmap',
    name: 'Dock Usage Heatmap',
    description: 'Visualize peak hours and days to optimize staffing and scheduling',
    features: [
      'Hour-by-hour, day-by-day usage visualization',
      'Identify bottleneck periods',
      'Plan maintenance during slow periods',
      'Optimize appointment scheduling windows',
    ],
    imageId: 'IMG-08',
    imageDesc: 'Dock Usage Over Time heatmap',
    imageSource: 'iDockLinkandmyQBrochure.pdf (page 2) - usage heatmap',
  },
  {
    id: 'session',
    name: 'Session Timeline',
    description: 'Drill into individual truck-at-dock sessions with event-level detail',
    features: [
      'Truck arrival → Restraint engaged → Door open → Leveler deployed → Forklift activity → Door closed → Departure',
      'Identify exactly where time was lost',
      'Calculate estimated detention fees per session',
      'Assign carrier information for accurate reporting',
    ],
    imageId: 'IMG-09',
    imageDesc: 'Session timeline detail showing event breakdown',
    imageSource: 'iDockLinkandmyQBrochure.pdf (page 2) - session timeline',
  },
];

const notifications = [
  { type: 'warning', message: 'Truck at Dock 7 approaching load time limit (1:45 elapsed)' },
  { type: 'alert', message: 'Dock 12 door open without trailer present - 15 minutes' },
  { type: 'safety', message: 'Restraint in bypass mode at Dock 3' },
  { type: 'info', message: 'After-hours activity detected at Dock 5' },
];

const knowledgeCheckQuestion = {
  question: 'A carrier disputes $2,400 in detention fees, claiming their drivers waited 3+ hours. The dock supervisor says it was under 2 hours. Which dashboard view settles this dispute?',
  options: [
    { id: 'a', text: 'Dock Usage Heatmap', correct: false },
    { id: 'b', text: 'Real-Time Activity', correct: false },
    { id: 'c', text: 'Session Timeline', correct: true },
    { id: 'd', text: 'Notification Log', correct: false },
  ],
  explanation: 'The Session Timeline shows exactly what happened during each truck-at-dock session—with timestamps for every event. You can see precisely when the trailer arrived, when loading actually started, and when it departed. This sensor-captured data is indisputable evidence for detention disputes.',
};

export default function Section4Analytics({ onComplete }: Section4Props) {
  const [activeView, setActiveView] = useState('realtime');
  const [showKnowledgeCheck, setShowKnowledgeCheck] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowExplanation(true);
    const isCorrect = knowledgeCheckQuestion.options.find(o => o.id === answerId)?.correct;
    if (isCorrect) {
      onComplete();
    }
  };

  const currentView = dashboardViews.find(v => v.id === activeView);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Section 4</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          The Analytics Dashboard
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Where sensor data becomes actionable intelligence.
        </p>
      </div>

      {/* Key Message */}
      <div className="bg-gradient-to-r from-blue-900/30 to-slate-900 rounded-2xl p-8 border border-blue-500/30">
        <h2 className="text-2xl font-bold text-white mb-4">From Data to Decisions</h2>
        <p className="text-slate-300 text-lg">
          The myQ dashboard transforms raw sensor data into visual reports that answer the questions 
          distribution managers ask every day:{' '}
          <span className="text-blue-400">"Which docks are bottlenecks? Which carriers are costing us money? 
          Where should I focus to improve throughput?"</span>
        </p>
      </div>

      {/* Dashboard View Selector */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Dashboard Views</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {dashboardViews.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${activeView === view.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }
              `}
            >
              {view.name}
            </button>
          ))}
        </div>

        {/* Active View Content */}
        {currentView && (
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">{currentView.name}</h3>
              <p className="text-slate-400">{currentView.description}</p>
            </div>
            
            <ImagePlaceholder 
              id={currentView.imageId}
              description={currentView.imageDesc}
              source={currentView.imageSource}
              aspectRatio="16:9"
              className="border-b border-slate-700"
            />
            
            <div className="p-6">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Key Features</h4>
              <ul className="space-y-3">
                {currentView.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Smart Notifications</h3>
        <p className="text-slate-400 mb-6">
          Get alerted to problems before they become expensive. Email and SMS notifications for:
        </p>
        <div className="space-y-3">
          {notifications.map((notif, idx) => (
            <div 
              key={idx}
              className={`
                flex items-center gap-4 p-4 rounded-lg border
                ${notif.type === 'warning' ? 'bg-amber-900/20 border-amber-500/30' : ''}
                ${notif.type === 'alert' ? 'bg-red-900/20 border-red-500/30' : ''}
                ${notif.type === 'safety' ? 'bg-purple-900/20 border-purple-500/30' : ''}
                ${notif.type === 'info' ? 'bg-blue-900/20 border-blue-500/30' : ''}
              `}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${notif.type === 'warning' ? 'bg-amber-500' : ''}
                ${notif.type === 'alert' ? 'bg-red-500' : ''}
                ${notif.type === 'safety' ? 'bg-purple-500' : ''}
                ${notif.type === 'info' ? 'bg-blue-500' : ''}
              `}>
                {notif.type === 'warning' && <span>⚠️</span>}
                {notif.type === 'alert' && <span>🚨</span>}
                {notif.type === 'safety' && <span>⛑️</span>}
                {notif.type === 'info' && <span>ℹ️</span>}
              </div>
              <span className="text-slate-300">{notif.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Device Agnostic */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-4xl mb-3">🖥️</div>
          <h4 className="text-white font-semibold">Desktop</h4>
          <p className="text-slate-400 text-sm mt-1">Full dashboard for office review</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-4xl mb-3">📱</div>
          <h4 className="text-white font-semibold">Tablet</h4>
          <p className="text-slate-400 text-sm mt-1">Walk-the-floor visibility</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
          <div className="text-4xl mb-3">📲</div>
          <h4 className="text-white font-semibold">Mobile</h4>
          <p className="text-slate-400 text-sm mt-1">Alerts anywhere, anytime</p>
        </div>
      </div>

      {/* Smithfield-Specific Value */}
      <div className="bg-gradient-to-r from-green-900/30 to-slate-900 rounded-2xl p-8 border border-green-500/30">
        <h3 className="text-xl font-bold text-white mb-4">Why This Matters for Food Distribution</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-green-400 font-semibold mb-2">Cold Chain Compliance</h4>
            <p className="text-slate-300 text-sm">
              Track exactly how long dock doors are open. Document temperature control for FSMA audits.
            </p>
          </div>
          <div>
            <h4 className="text-green-400 font-semibold mb-2">Detention Fee Recovery</h4>
            <p className="text-slate-300 text-sm">
              Dispute invalid charges with timestamped evidence. Identify chronic problem carriers.
            </p>
          </div>
          <div>
            <h4 className="text-green-400 font-semibold mb-2">Reefer Management</h4>
            <p className="text-slate-300 text-sm">
              Prioritize refrigerated loads. Minimize dwell time when reefer units are burning fuel.
            </p>
          </div>
          <div>
            <h4 className="text-green-400 font-semibold mb-2">Peak Season Planning</h4>
            <p className="text-slate-300 text-sm">
              Use historical heatmaps to staff appropriately for holiday rushes.
            </p>
          </div>
        </div>
      </div>

      {/* Knowledge Check */}
      {!showKnowledgeCheck ? (
        <div className="text-center">
          <button
            onClick={() => setShowKnowledgeCheck(true)}
            className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
          >
            ✓ Take Knowledge Check
          </button>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-2 text-green-400 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Knowledge Check</span>
          </div>
          
          <p className="text-white text-lg mb-6">{knowledgeCheckQuestion.question}</p>
          
          <div className="space-y-3">
            {knowledgeCheckQuestion.options.map((option) => {
              let optionClass = 'quiz-option';
              if (selectedAnswer) {
                if (option.correct) {
                  optionClass += ' correct';
                } else if (selectedAnswer === option.id && !option.correct) {
                  optionClass += ' incorrect';
                }
              }
              
              return (
                <button
                  key={option.id}
                  onClick={() => !selectedAnswer && handleAnswerSelect(option.id)}
                  disabled={!!selectedAnswer}
                  className={`${optionClass} w-full text-left`}
                >
                  <span className="text-slate-400 mr-3">{option.id.toUpperCase()}.</span>
                  <span className="text-white">{option.text}</span>
                </button>
              );
            })}
          </div>
          
          {showExplanation && (
            <div className={`mt-6 p-4 rounded-lg ${
              knowledgeCheckQuestion.options.find(o => o.id === selectedAnswer)?.correct 
                ? 'bg-green-900/30 border border-green-500/30' 
                : 'bg-amber-900/30 border border-amber-500/30'
            }`}>
              <p className="text-slate-300">{knowledgeCheckQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
