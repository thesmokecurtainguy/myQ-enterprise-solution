'use client';

import { useState } from 'react';

interface Section5Props {
  onComplete: () => void;
}

const scenarios = [
  {
    id: 1,
    title: 'The Detention Fee Dispute',
    icon: '💰',
    color: 'amber',
    situation: `A refrigerated carrier just sent Smithfield an invoice claiming $2,400 in detention fees from last month. They say their drivers waited an average of 3+ hours per load. Your dock supervisor says that's impossible — "we turn trucks in under 2 hours."
    
Who's right? And how do you prove it?`,
    question: 'What myQ data would you pull to resolve this dispute?',
    options: [
      { id: 'a', text: 'Dock usage heatmap showing busy periods', correct: false },
      { id: 'b', text: 'Carrier detention report with session-level timestamps', correct: true },
      { id: 'c', text: 'Real-time dashboard screenshot', correct: false },
      { id: 'd', text: 'Forklift activity logs', correct: false },
    ],
    explanation: `The Carrier Detention Report shows exactly how much time each carrier's trucks spent at docks, broken down by session. You can drill into individual sessions to see timestamps for arrival, loading start, loading end, and departure. This sensor-captured data is indisputable—it's not someone's memory or a handwritten log.`,
    learningPoints: [
      'Trailer Present Sensor provides timestamped arrival/departure',
      'Session-level data shows exactly what happened',
      'Carrier comparison reports identify problem carriers vs. problem docks',
      'Data gives leverage in carrier negotiations',
    ],
    smithfieldAngle: 'Refrigerated trailers charge $75-150/hour after free time. With 50+ docks and hundreds of loads per week, even a 10% reduction in detention fees could save $50K+ annually.',
  },
  {
    id: 2,
    title: 'The Cold Chain Crisis',
    icon: '❄️',
    color: 'blue',
    situation: `It's July in North Carolina. A dock door has been open for 45 minutes with no trailer present. The refrigerated warehouse is losing temperature. Product in the staging area may be compromised. 

Nobody noticed until a forklift driver mentioned it was "warm in there."

How do you prevent this from happening again?`,
    question: 'Which myQ feature addresses this problem?',
    options: [
      { id: 'a', text: 'Appointment scheduling to reduce congestion', correct: false },
      { id: 'b', text: 'Door Open Sensor with real-time alerts', correct: true },
      { id: 'c', text: 'Forklift Activity tracking', correct: false },
      { id: 'd', text: 'Carrier detention reporting', correct: false },
    ],
    explanation: `The Door Open Sensor detects when a door is open without a trailer present and can trigger immediate alerts via email or text. The "Door Unnecessary Open Time" analytics show patterns across docks and shifts—maybe Dock 7 on night shift is a chronic problem. You'd have caught this in 5 minutes, not 45.`,
    learningPoints: [
      'Door Open Sensor detects door position',
      'Alerts trigger when door open without trailer present',
      '"Unnecessary open time" tracked in analytics',
      'Energy cost savings + food safety compliance',
    ],
    smithfieldAngle: 'For a refrigerated warehouse, every minute of open-door time is energy waste AND food safety risk. FSMA documentation of temperature control starts at the dock.',
  },
  {
    id: 3,
    title: 'The Safety Near-Miss',
    icon: '⚠️',
    color: 'red',
    situation: `A forklift operator entered a trailer to unload. The vehicle restraint wasn't engaged. The trailer crept forward, and the forklift nearly fell off the dock leveler. 

Nobody was hurt, but it could have been a fatality. OSHA is asking questions.

What data do you have?`,
    question: 'How does myQ help with OSHA documentation?',
    options: [
      { id: 'a', text: 'Real-time visibility shows current dock status', correct: false },
      { id: 'b', text: 'Appointment system tracks which carriers were present', correct: false },
      { id: 'c', text: 'Restraint bypass monitoring logs every override event', correct: true },
      { id: 'd', text: 'Heatmaps show when the incident likely occurred', correct: false },
    ],
    explanation: `The Restraint Engaged Sensor logs every restraint operation. If the restraint was bypassed, that's logged with a timestamp. The system can even be configured to prevent leveler operation without restraint engagement (interlock mode). For OSHA, you can show: your equipment has safety interlocks, bypass events are logged, and this was a training issue not a system failure.`,
    learningPoints: [
      'Restraint Engaged Sensor tracks compliance',
      '"Restraint bypass monitoring" shows which docks/shifts are problematic',
      'Interlock sequences can prevent operation without restraint',
      '3-color light communication provides visual confirmation',
    ],
    smithfieldAngle: '25% of warehouse accidents occur at loading docks. One fatality costs $1M+ in direct costs, plus OSHA fines, lawsuits, and reputation damage. Documentation is your defense.',
  },
  {
    id: 4,
    title: 'The Peak Season Chaos',
    icon: '🌪️',
    color: 'purple',
    situation: `It's the week before a major holiday. Smithfield is shipping 40% more volume than normal. Trucks are lined up outside the gate at 5am. The yard is gridlocked. Dock supervisors are making assignments with walkie-talkies and sticky notes.

Drivers are angry. Dwell times are through the roof. Where do you start?`,
    question: 'Which myQ pillars work together to solve this?',
    options: [
      { id: 'a', text: 'Gate Management alone', correct: false },
      { id: 'b', text: 'Dock Management alone', correct: false },
      { id: 'c', text: 'Appointment + Gate + Yard + Dock working together', correct: true },
      { id: 'd', text: 'Just more staff at the guard shack', correct: false },
    ],
    explanation: `Peak season chaos requires all 4 pillars: Appointment Management prevents over-scheduling and staggers arrivals. Gate Management automates check-in so drivers don't wait for the guard. Yard Management shows exactly where every trailer is and dispatches yard jockeys efficiently. Dock Management dynamically assigns trucks to docks based on load type, priority, and equipment. The result: controlled flow instead of chaos.`,
    learningPoints: [
      'Appointment Management prevents over-scheduling',
      'Gate Management automates check-in (SMS/kiosk)',
      'Dynamic Dock Assignment optimizes based on load type',
      'Real-time visibility shows what\'s happening NOW',
    ],
    smithfieldAngle: 'Holiday protein demand is predictable. With historical data, you can set appointment windows, staff appropriately, and turn chaos into controlled throughput.',
  },
  {
    id: 5,
    title: 'The New Supervisor Problem',
    icon: '👤',
    color: 'green',
    situation: `Your most experienced dock supervisor just retired. He had 20 years of knowledge in his head—which carriers were reliable, which docks were fastest, which times were busiest.

The new supervisor is struggling. Decisions that were automatic for the veteran are now guesswork.

How do you transfer that institutional knowledge?`,
    question: 'How does myQ replace tribal knowledge?',
    options: [
      { id: 'a', text: 'Training manuals from the retired supervisor', correct: false },
      { id: 'b', text: 'Historical analytics that capture patterns automatically', correct: true },
      { id: 'c', text: 'More walkie-talkies for communication', correct: false },
      { id: 'd', text: 'Hiring another experienced supervisor', correct: false },
    ],
    explanation: `The veteran's knowledge was valuable because it was based on patterns—patterns that myQ captures automatically. The heatmap shows which hours are busiest. The carrier reports show who's reliable. The dock analytics show which positions are fastest. The new supervisor can make data-driven decisions from day one, instead of spending 5 years building intuition.`,
    learningPoints: [
      'Analytics capture the patterns automatically',
      'Dock usage heatmaps show peak hours',
      'Carrier performance comparisons show who\'s reliable',
      'Historical data enables data-driven decisions vs. tribal knowledge',
    ],
    smithfieldAngle: '48% of warehouse managers say retaining workers is their top priority. When workers leave, their knowledge shouldn\'t walk out with them.',
  },
  {
    id: 6,
    title: 'The ROI Conversation',
    icon: '📊',
    color: 'cyan',
    situation: `The GM asks: "This sounds great, but what's it going to cost and what's the payback?" 

You need to build the business case on the spot. What numbers do you use?`,
    question: 'What\'s the typical annual ROI for a facility with 20+ docks?',
    options: [
      { id: 'a', text: '$25,000 - $50,000', correct: false },
      { id: 'b', text: '$100,000 - $150,000', correct: false },
      { id: 'c', text: '$200,000 - $300,000', correct: true },
      { id: 'd', text: '$500,000+', correct: false },
    ],
    explanation: `Industry benchmarks show: 8% reduction in outbound labor hours, 3% increased inbound truck throughput, 1-3 FTE reduction in security/manual tracking, plus detention fee recovery that's often $50-100K+ alone. For a facility like Smithfield with 20+ docks, $250K annual savings is a realistic target. Most customers see payback in 12-18 months.`,
    learningPoints: [
      '8% reduction in outbound labor hours',
      '3% increased inbound truck throughput',
      '1-3 FTE reduction in manual tracking/security',
      'Detention fee recovery often $50-100K+ annually',
    ],
    smithfieldAngle: '56% of warehouse managers say operating cost is their most important metric. This isn\'t a technology purchase—it\'s an ROI investment.',
  },
];

export default function Section5Scenarios({ onComplete }: Section5Props) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const scenario = scenarios[currentScenario];

  const handleAnswerSelect = (scenarioId: number, answerId: string) => {
    setSelectedAnswers({ ...selectedAnswers, [scenarioId]: answerId });
    setShowExplanations({ ...showExplanations, [scenarioId]: true });
    
    const isCorrect = scenario.options.find(o => o.id === answerId)?.correct;
    if (isCorrect && !completedScenarios.includes(scenarioId)) {
      const newCompleted = [...completedScenarios, scenarioId];
      setCompletedScenarios(newCompleted);
      
      // Complete section when all scenarios are done
      if (newCompleted.length === scenarios.length) {
        onComplete();
      }
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      amber: { bg: 'bg-amber-900/30', border: 'border-amber-500/30', text: 'text-amber-400' },
      blue: { bg: 'bg-blue-900/30', border: 'border-blue-500/30', text: 'text-blue-400' },
      red: { bg: 'bg-red-900/30', border: 'border-red-500/30', text: 'text-red-400' },
      purple: { bg: 'bg-purple-900/30', border: 'border-purple-500/30', text: 'text-purple-400' },
      green: { bg: 'bg-green-900/30', border: 'border-green-500/30', text: 'text-green-400' },
      cyan: { bg: 'bg-cyan-900/30', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    };
    return colors[color] || colors.blue;
  };

  const colorClasses = getColorClasses(scenario.color);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Section 5</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          Scenario Challenges
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Apply your knowledge to realistic Smithfield situations.
        </p>
      </div>

      {/* Scenario Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {scenarios.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentScenario(idx)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
              ${currentScenario === idx 
                ? 'bg-blue-600 text-white' 
                : completedScenarios.includes(s.id)
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }
            `}
          >
            <span>{s.icon}</span>
            <span className="hidden md:inline">{s.title}</span>
            <span className="md:hidden">{idx + 1}</span>
            {completedScenarios.includes(s.id) && (
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="text-center text-slate-400 text-sm">
        {completedScenarios.length} of {scenarios.length} scenarios completed
      </div>

      {/* Scenario Card */}
      <div className={`scenario-card ${colorClasses.bg} ${colorClasses.border}`}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{scenario.icon}</span>
          <div>
            <h2 className={`text-2xl font-bold ${colorClasses.text}`}>{scenario.title}</h2>
            <p className="text-slate-400">Scenario {currentScenario + 1} of {scenarios.length}</p>
          </div>
        </div>

        {/* Situation */}
        <div className="bg-slate-900/50 rounded-lg p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">The Situation</h3>
          <p className="text-slate-200 whitespace-pre-line leading-relaxed">{scenario.situation}</p>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold ${colorClasses.text} mb-4`}>{scenario.question}</h3>
          <div className="space-y-3">
            {scenario.options.map((option) => {
              const isSelected = selectedAnswers[scenario.id] === option.id;
              const isAnswered = !!selectedAnswers[scenario.id];
              
              let optionClass = 'quiz-option';
              if (isAnswered) {
                if (option.correct) {
                  optionClass += ' correct';
                } else if (isSelected && !option.correct) {
                  optionClass += ' incorrect';
                }
              }
              
              return (
                <button
                  key={option.id}
                  onClick={() => !isAnswered && handleAnswerSelect(scenario.id, option.id)}
                  disabled={isAnswered}
                  className={`${optionClass} w-full text-left`}
                >
                  <span className="text-slate-400 mr-3">{option.id.toUpperCase()}.</span>
                  <span className="text-white">{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanations[scenario.id] && (
          <div className="space-y-6 animate-fadeIn">
            <div className={`p-4 rounded-lg ${
              scenario.options.find(o => o.id === selectedAnswers[scenario.id])?.correct 
                ? 'bg-green-900/30 border border-green-500/30' 
                : 'bg-amber-900/30 border border-amber-500/30'
            }`}>
              <h4 className="font-semibold text-white mb-2">Explanation</h4>
              <p className="text-slate-300">{scenario.explanation}</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3">Key Learning Points</h4>
              <ul className="space-y-2">
                {scenario.learningPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-slate-900 rounded-lg p-4 border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">🎯 Smithfield-Specific Angle</h4>
              <p className="text-slate-300 text-sm">{scenario.smithfieldAngle}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentScenario(Math.max(0, currentScenario - 1))}
          disabled={currentScenario === 0}
          className={`
            px-4 py-2 rounded-lg font-medium transition-colors
            ${currentScenario === 0 
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
              : 'bg-slate-700 text-white hover:bg-slate-600'
            }
          `}
        >
          ← Previous Scenario
        </button>
        
        <button
          onClick={() => setCurrentScenario(Math.min(scenarios.length - 1, currentScenario + 1))}
          disabled={currentScenario === scenarios.length - 1}
          className={`
            px-4 py-2 rounded-lg font-medium transition-colors
            ${currentScenario === scenarios.length - 1 
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-500'
            }
          `}
        >
          Next Scenario →
        </button>
      </div>
    </div>
  );
}
