'use client';

import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

interface Section2Props {
  onComplete: () => void;
}

const pillars = [
  {
    id: 1,
    name: 'Appointment Management',
    tagline: 'Control the chaos before it arrives',
    description: 'Online scheduling portal that lets carriers book dock appointments. Set capacity limits to prevent over-scheduling. Eliminate the 5am truck lineup.',
    benefits: ['Prevents yard congestion', 'Reduces driver wait times', 'Enables capacity planning'],
    icon: '📅',
    color: 'blue',
  },
  {
    id: 2,
    name: 'Gate Management',
    tagline: 'First impression, automated',
    description: 'Automated check-in via SMS, mobile app, or kiosk. AI-powered routing sends drivers to the right dock. Multilingual support for diverse driver populations.',
    benefits: ['Eliminates manual check-in', 'Reduces security headcount', 'Automated gate access'],
    icon: '🚪',
    color: 'green',
  },
  {
    id: 3,
    name: 'Yard Management',
    tagline: 'Know where every trailer is, always',
    description: 'Real-time trailer inventory with location tracking. Digital task dispatch for yard jockeys. Alerts for trailers dwelling too long.',
    benefits: ['Real-time yard visibility', 'Optimized jockey utilization', 'Reduced trailer dwell time'],
    icon: '🚛',
    color: 'amber',
  },
  {
    id: 4,
    name: 'Dock Management',
    tagline: 'The IoT-powered command center',
    description: 'Smart dock monitoring with sensor-driven automation. Real-time status of every dock position. AI-optimized dock assignments based on load type, carrier, and equipment.',
    benefits: ['Sensor-driven data capture', 'Automated safety interlocks', 'Performance analytics'],
    icon: '🏭',
    color: 'purple',
  },
];

const differentiators = [
  {
    title: 'Connected Hardware + Software',
    description: 'We\'re not just software. Our IoT sensors capture data automatically—no manual entry, no human error.',
    competitors: 'Software-only solutions require manual data entry and rely on people remembering to update systems.',
  },
  {
    title: 'Hardware Ecosystem',
    description: 'LiftMaster gate operators, Poweramp dock equipment, McGuire restraints, DLM levelers—all integrated.',
    competitors: 'Competitors integrate with third-party hardware, creating finger-pointing when things break.',
  },
  {
    title: 'White Glove Implementation',
    description: 'Dedicated customer success team handles installation, training, and ongoing optimization.',
    competitors: 'Many solutions are self-service, leaving customers to figure out implementation alone.',
  },
];

const knowledgeCheckQuestion = {
  question: 'A facility is struggling with trucks lining up at 5am, creating yard gridlock. Which myQ pillar addresses this problem FIRST?',
  options: [
    { id: 'a', text: 'Dock Management', correct: false },
    { id: 'b', text: 'Yard Management', correct: false },
    { id: 'c', text: 'Appointment Management', correct: true },
    { id: 'd', text: 'Gate Management', correct: false },
  ],
  explanation: 'Appointment Management is the first line of defense—it prevents the chaos before trucks even arrive. By setting capacity limits and scheduling windows, you eliminate the 5am rush. Gate Management handles check-in once they arrive, but the root cause is uncontrolled arrivals.',
};

export default function Section2Solution({ onComplete }: Section2Props) {
  const [activePillar, setActivePillar] = useState<number | null>(null);
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

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors: Record<string, { border: string; bg: string; text: string }> = {
      blue: { border: 'border-blue-500', bg: 'bg-blue-500/20', text: 'text-blue-400' },
      green: { border: 'border-green-500', bg: 'bg-green-500/20', text: 'text-green-400' },
      amber: { border: 'border-amber-500', bg: 'bg-amber-500/20', text: 'text-amber-400' },
      purple: { border: 'border-purple-500', bg: 'bg-purple-500/20', text: 'text-purple-400' },
    };
    return isActive ? colors[color] : { border: 'border-slate-700', bg: '', text: 'text-slate-400' };
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Section 2</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          The myQ Enterprise Solution
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          The only connected hardware/software dock management solution on the market.
        </p>
      </div>

      {/* Tagline */}
      <div className="text-center bg-gradient-to-r from-blue-900/30 via-slate-900 to-blue-900/30 rounded-2xl p-8 border border-blue-500/20">
        <p className="text-3xl font-bold">
          <span className="text-blue-400">Digitize.</span>{' '}
          <span className="text-green-400">Automate.</span>{' '}
          <span className="text-purple-400">Optimize.</span>
        </p>
        <p className="text-slate-400 mt-4">Transform loading dock operations from reactive to proactive</p>
      </div>

      {/* System Architecture Image */}
      <ImagePlaceholder 
        id="IMG-02"
        description="myQ System Architecture - iDock Link → Gateway → Cloud → Dashboard"
        source="iDockLinkandmyQBrochure.pdf (page 1) - system flow diagram"
        aspectRatio="16:9"
      />

      {/* 4 Pillars */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">The 4-Pillar Solution Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((pillar) => {
            const isActive = activePillar === pillar.id;
            const colorClasses = getColorClasses(pillar.color, isActive);
            
            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(isActive ? null : pillar.id)}
                className={`
                  pillar-card cursor-pointer transition-all duration-300
                  ${isActive ? `${colorClasses.border} ${colorClasses.bg}` : 'border-slate-700 hover:border-slate-600'}
                `}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{pillar.icon}</span>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${isActive ? colorClasses.text : 'text-white'}`}>
                      {pillar.name}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">{pillar.tagline}</p>
                    
                    {isActive && (
                      <div className="mt-4 space-y-4 animate-fadeIn">
                        <p className="text-slate-300">{pillar.description}</p>
                        <div className="space-y-2">
                          {pillar.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <svg className={`w-4 h-4 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-slate-300 text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Differentiator */}
      <div className="bg-gradient-to-r from-green-900/30 to-slate-900 rounded-2xl p-8 border border-green-500/30">
        <h2 className="text-2xl font-bold text-white mb-6">Why myQ Enterprise Wins</h2>
        <div className="space-y-6">
          {differentiators.map((diff, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">{diff.title}</h3>
                <p className="text-slate-300">{diff.description}</p>
              </div>
              <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/20">
                <span className="text-red-400 text-sm font-semibold">vs. Competition: </span>
                <span className="text-slate-400 text-sm">{diff.competitors}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hardware Ecosystem */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">The Connected Hardware Ecosystem</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { brand: 'LiftMaster', products: 'Gate operators, door operators' },
            { brand: 'Poweramp', products: 'Dock levelers, restraints' },
            { brand: 'McGuire', products: 'Vehicle restraints' },
            { brand: 'DLM', products: 'Dock equipment' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900 rounded-lg p-4 text-center">
              <p className="text-blue-400 font-bold">{item.brand}</p>
              <p className="text-slate-500 text-sm mt-1">{item.products}</p>
            </div>
          ))}
        </div>
        <p className="text-slate-400 text-sm mt-4 text-center">
          All hardware talks to one platform. One login. One dashboard. One support number.
        </p>
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
