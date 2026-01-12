'use client';

import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

interface Section3Props {
  onComplete: () => void;
}

const sensors = [
  {
    id: 1,
    name: 'Trailer Present Sensor',
    partNumber: '7155-0007',
    whatItDoes: 'Detects when a trailer backs into a dock position',
    dataCaptures: 'Arrival time, departure time, total turn time',
    businessValue: 'Automatic timestamps eliminate he-said-she-said detention disputes',
    icon: '🚛',
  },
  {
    id: 2,
    name: 'Leveler Stored Sensor',
    partNumber: '7155-0009',
    whatItDoes: 'Monitors whether the dock leveler is deployed or stored',
    dataCaptures: 'Loading start time, loading end time, actual load duration',
    businessValue: 'Separates actual loading time from wasted dwell time',
    icon: '📐',
  },
  {
    id: 3,
    name: 'Restraint Engaged Sensor',
    partNumber: 'Standard on auto restraints',
    whatItDoes: 'Confirms vehicle restraint has captured the trailer ICC bar',
    dataCaptures: 'Restraint engagement, bypass events, compliance rate',
    businessValue: 'OSHA documentation, safety compliance tracking',
    icon: '🔒',
  },
  {
    id: 4,
    name: 'Door Open/Closed Sensors',
    partNumber: '7155-0010/0011',
    whatItDoes: 'Monitors overhead door position',
    dataCaptures: 'Door open events, duration open without trailer, after-hours activity',
    businessValue: 'Energy loss tracking, security alerts, cold chain compliance',
    icon: '🚪',
  },
  {
    id: 5,
    name: 'Forklift Activity Sensor',
    partNumber: '7155-0008',
    whatItDoes: 'Counts forklift entries/exits through the dock opening',
    dataCaptures: 'Number of forklift cycles, activity gaps, worker efficiency',
    businessValue: 'Identifies idle time, proves loading activity to carriers',
    icon: '🏗️',
  },
  {
    id: 6,
    name: 'Hydraulic Fluid Level Sensor',
    partNumber: '7155-0001/0002',
    whatItDoes: 'Monitors hydraulic fluid level in dock leveler reservoir',
    dataCaptures: 'Fluid level, low-level alerts',
    businessValue: 'Predictive maintenance, prevents leveler failures',
    icon: '🛢️',
  },
];

const iDockControllerFeatures = [
  { name: 'Multi-Colored LED Light', description: 'Green/Red/Amber communication system visible to drivers' },
  { name: 'Message Display', description: 'Shows equipment status, fault codes, maintenance history' },
  { name: 'Membrane Buttons', description: 'Tactile feedback for all dock operations' },
  { name: 'Cycle Counters', description: 'Tracks equipment usage for maintenance scheduling' },
  { name: 'Fault History', description: 'Logs all equipment faults with timestamps' },
];

const knowledgeCheckQuestion = {
  question: 'Match the sensor to the data it captures: "Door was open for 45 minutes without a trailer present."',
  options: [
    { id: 'a', text: 'Trailer Present Sensor', correct: false },
    { id: 'b', text: 'Leveler Stored Sensor', correct: false },
    { id: 'c', text: 'Door Open Sensor', correct: true },
    { id: 'd', text: 'Forklift Activity Sensor', correct: false },
  ],
  explanation: 'The Door Open Sensor monitors door position and triggers alerts when the door is open without a trailer present. This is critical for cold chain facilities where open doors mean temperature loss and energy waste.',
};

export default function Section3Hardware({ onComplete }: Section3Props) {
  const [expandedSensor, setExpandedSensor] = useState<number | null>(null);
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
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Section 3</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          The IoT Hardware Foundation
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          How sensors capture data automatically—no manual entry, no human error.
        </p>
      </div>

      {/* Key Message */}
      <div className="bg-gradient-to-r from-purple-900/30 to-slate-900 rounded-2xl p-8 border border-purple-500/30">
        <h2 className="text-2xl font-bold text-white mb-4">The Hardware Difference</h2>
        <p className="text-slate-300 text-lg">
          Most "dock management" software is just a fancy spreadsheet—it only knows what someone remembers to type in.{' '}
          <span className="text-purple-400">myQ Enterprise knows what actually happened</span> because sensors capture 
          every event automatically, with timestamps, 24/7.
        </p>
      </div>

      {/* Sensor Placement Diagram */}
      <ImagePlaceholder 
        id="IMG-03"
        description="Sensor placement diagram showing all 7 sensors positioned on a dock"
        source="s_idock_optional_hardware_4111_0092_aug2021.pdf (page 10)"
        aspectRatio="4:3"
      />

      {/* iDock Controller */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold text-white mb-4">The iDock Controller</h3>
            <p className="text-slate-300 mb-4">
              The brain at each dock position. Integrates levelers, restraints, and door operators into a 
              single control panel with built-in intelligence.
            </p>
            <div className="space-y-3">
              {iDockControllerFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-white font-medium">{feature.name}: </span>
                    <span className="text-slate-400">{feature.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <ImagePlaceholder 
              id="IMG-04"
              description="iDock Controller panel with buttons and display"
              source="s_idock_optional_hardware_4111_0092_aug2021.pdf (page 7)"
              aspectRatio="4:3"
            />
          </div>
        </div>
      </div>

      {/* 3-Color Light Communication */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">3-Color Light Communication</h3>
        <p className="text-slate-400 mb-6">Visual signals that tell drivers and dock workers the status at a glance:</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
            <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-3 shadow-lg shadow-green-500/50"></div>
            <p className="text-green-400 font-bold">GREEN</p>
            <p className="text-slate-400 text-sm mt-1">Safe to proceed</p>
          </div>
          <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-500/30">
            <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-3 shadow-lg shadow-red-500/50"></div>
            <p className="text-red-400 font-bold">RED</p>
            <p className="text-slate-400 text-sm mt-1">Stop / Do not enter</p>
          </div>
          <div className="text-center p-4 bg-amber-900/30 rounded-lg border border-amber-500/30">
            <div className="w-12 h-12 bg-amber-500 rounded-full mx-auto mb-3 shadow-lg shadow-amber-500/50"></div>
            <p className="text-amber-400 font-bold">AMBER</p>
            <p className="text-slate-400 text-sm mt-1">Fault or bypass mode</p>
          </div>
        </div>
      </div>

      {/* Trailer Present Sensor Photo */}
      <ImagePlaceholder 
        id="IMG-05"
        description="Trailer Present Sensor mounted on exterior with 3-color light"
        source="Truck_Present_sensor.pdf (page 1)"
        aspectRatio="16:9"
      />

      {/* The 7 Sensors */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">The Sensor Ecosystem</h2>
        <p className="text-slate-400 mb-6">Click each sensor to see what data it captures and why it matters:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sensors.map((sensor) => {
            const isExpanded = expandedSensor === sensor.id;
            
            return (
              <div
                key={sensor.id}
                onClick={() => setExpandedSensor(isExpanded ? null : sensor.id)}
                className={`
                  bg-slate-800 rounded-xl p-5 border cursor-pointer transition-all
                  ${isExpanded ? 'border-blue-500 bg-blue-900/20' : 'border-slate-700 hover:border-slate-600'}
                `}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{sensor.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{sensor.name}</h3>
                    <p className="text-slate-500 text-sm">{sensor.partNumber}</p>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {isExpanded && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-slate-700">
                    <div>
                      <span className="text-blue-400 text-sm font-semibold">What it does: </span>
                      <span className="text-slate-300 text-sm">{sensor.whatItDoes}</span>
                    </div>
                    <div>
                      <span className="text-green-400 text-sm font-semibold">Data captured: </span>
                      <span className="text-slate-300 text-sm">{sensor.dataCaptures}</span>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <span className="text-purple-400 text-sm font-semibold">Business value: </span>
                      <span className="text-slate-300 text-sm">{sensor.businessValue}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* iDock Gateway */}
      <div className="bg-gradient-to-r from-blue-900/30 to-slate-900 rounded-2xl p-8 border border-blue-500/30">
        <h3 className="text-xl font-bold text-white mb-4">The iDock Gateway</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-300 mb-4">
              The bridge between your dock equipment and the cloud. Connects to each iDock Controller 
              and streams data to myQ.com for online reporting and analytics.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-300">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Connects loading dock equipment to cloud
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Device agnostic—desktop, tablet, mobile
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Real-time data streaming
              </li>
            </ul>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Key Point for Smithfield:</p>
            <p className="text-white">
              <span className="text-green-400">"No rip-and-replace."</span> iDock Link can be added to most existing 
              loading docks to offer the benefits of myQ Dock Management. No need to replace all existing equipment.
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
