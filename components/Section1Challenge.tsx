'use client';

import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

interface Section1Props {
  onComplete: () => void;
}

const painPoints = [
  {
    id: 1,
    title: 'Temperature Control at Dock Doors',
    description: 'Every minute a dock door is open without a trailer, cold air escapes. In refrigerated facilities, this isn\'t just an energy cost—it\'s a food safety risk.',
    impact: 'Product spoilage, FSMA compliance violations, energy waste',
    icon: '🌡️',
  },
  {
    id: 2,
    title: 'Detention Fees on Refrigerated Trailers',
    description: 'Reefer trailers charge $75-150/hour after free time expires. When trucks sit waiting for dock assignments, those fees add up fast.',
    impact: '$50,000-$150,000+ annually in avoidable detention costs',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Driver Scheduling for Time-Sensitive Loads',
    description: 'Protein products have tight delivery windows. Late shipments mean rejected loads. Early arrivals mean yard congestion.',
    impact: 'Rejected shipments, customer chargebacks, lost business',
    icon: '⏰',
  },
  {
    id: 4,
    title: 'Food Safety Traceability & Documentation',
    description: 'FSMA requires documentation of temperature control throughout the supply chain. Manual logs are error-prone and audit-risky.',
    impact: 'Audit failures, recall liability, regulatory fines',
    icon: '📋',
  },
  {
    id: 5,
    title: 'Perishable Goods with Costly Delays',
    description: 'Unlike dry goods, protein products can\'t wait. A 4-hour delay in July heat can turn a profitable load into a total loss.',
    impact: 'Product loss, insurance claims, customer relationships',
    icon: '🥩',
  },
];

const industryStats = [
  { value: '56%', label: 'of warehouse managers say operating cost is their most important metric' },
  { value: '25%', label: 'of warehouse accidents occur at the loading dock' },
  { value: '48%', label: 'of warehouse managers say retaining workers is their top priority' },
  { value: '50%', label: 'of supply chain managers say throughput (trucks/day) is their top concern' },
];

const knowledgeCheckQuestion = {
  question: 'A Smithfield distribution manager says "Our biggest problem is we never know what\'s really happening at the docks." Which pain point does this represent?',
  options: [
    { id: 'a', text: 'Temperature control issues', correct: false },
    { id: 'b', text: 'The visibility gap', correct: true },
    { id: 'c', text: 'Driver scheduling conflicts', correct: false },
    { id: 'd', text: 'Detention fee disputes', correct: false },
  ],
  explanation: 'This describes the "visibility gap" — what you can\'t see, you can\'t manage. Without real-time data from the docks, managers are forced to rely on manual reports, walkie-talkies, and tribal knowledge.',
};

export default function Section1Challenge({ onComplete }: Section1Props) {
  const [expandedPainPoint, setExpandedPainPoint] = useState<number | null>(null);
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

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Section 1</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          The Food Distribution Challenge
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Before we talk product, let's understand what keeps Smithfield's distribution managers up at night.
        </p>
      </div>

      {/* Image Placeholder for cold storage dock photo */}
      <ImagePlaceholder 
        id="IMG-01"
        description="Cold storage/refrigerated dock facility photo"
        source="Optional - compelling cold chain facility image"
        aspectRatio="21:9"
      />

      {/* The Visibility Gap Intro */}
      <div className="bg-gradient-to-r from-red-900/30 to-slate-900 rounded-2xl p-8 border border-red-500/30">
        <h2 className="text-2xl font-bold text-white mb-4">The Visibility Gap</h2>
        <p className="text-slate-300 text-lg leading-relaxed">
          In most food distribution facilities, dock operations run on a combination of <span className="text-red-400">walkie-talkies, 
          sticky notes, and institutional knowledge</span>. The dock supervisor knows which carriers are reliable. 
          The yard jockey knows where trailers are parked. But <span className="text-red-400">none of that knowledge is captured, 
          measured, or actionable</span>.
        </p>
        <p className="text-slate-400 mt-4 text-lg">
          When that supervisor retires, the knowledge walks out the door with them.
        </p>
      </div>

      {/* 5 Pain Points */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">5 Pain Points Keeping Managers Up at Night</h2>
        <div className="space-y-4">
          {painPoints.map((point) => (
            <div 
              key={point.id}
              className="pain-point-card cursor-pointer"
              onClick={() => setExpandedPainPoint(expandedPainPoint === point.id ? null : point.id)}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{point.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                    <svg 
                      className={`w-5 h-5 text-slate-400 transition-transform ${expandedPainPoint === point.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {expandedPainPoint === point.id && (
                    <div className="mt-4 space-y-3 animate-fadeIn">
                      <p className="text-slate-300">{point.description}</p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <span className="text-red-400 text-sm font-semibold">Business Impact: </span>
                        <span className="text-slate-400 text-sm">{point.impact}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Statistics */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">The Numbers Don't Lie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industryStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insight Box */}
      <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">The Core Problem</h3>
            <p className="text-slate-300">
              Food distribution managers are making <span className="text-blue-400">million-dollar decisions</span> based on 
              <span className="text-red-400"> thousand-dollar data</span>. They know there's a problem, but they can't 
              quantify it, can't pinpoint it, and can't prove it to carriers or executives.
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
              } else {
                optionClass += ' hover:border-blue-500';
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
