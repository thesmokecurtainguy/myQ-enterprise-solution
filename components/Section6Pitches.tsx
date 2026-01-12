'use client';

import { useState, useEffect } from 'react';

interface Section6Props {
  onComplete: () => void;
}

const stakeholders = [
  {
    id: 'distribution',
    title: 'Distribution Manager',
    icon: '📦',
    color: 'blue',
    concerns: ['Day-to-day dock operations', 'Truck throughput', 'Worker productivity', 'Carrier relationships'],
    pitch: `"You'll know exactly what's happening at every dock, in real-time. No more guessing. No more he-said-she-said with carriers. Data to back up every decision."`,
    talkingPoints: [
      'Real-time visibility into all dock positions from your desk or phone',
      'Automatic timestamps eliminate disputes with carriers',
      'Historical analytics show patterns you can act on',
      'Alerts notify you before small problems become big ones',
    ],
    objectionHandle: {
      objection: '"My team doesn\'t have time to learn a new system."',
      response: 'The beauty is it captures data automatically—no extra data entry. Your team keeps doing their jobs; the sensors do the tracking. And the mobile app is as simple as checking the weather.',
    },
  },
  {
    id: 'gm',
    title: 'General Manager',
    icon: '👔',
    color: 'green',
    concerns: ['Bottom-line impact', 'ROI and payback', 'Operational efficiency', 'Competitive advantage'],
    pitch: `"This pays for itself in detention fee recovery alone. Add the labor savings and throughput improvement, and you're looking at $200-300K annually for a facility this size."`,
    talkingPoints: [
      '8% reduction in outbound labor hours',
      '3% increased inbound truck throughput',
      '1-3 FTE reduction in security/manual tracking',
      'Detention fee recovery often $50-100K+ annually',
      'Most customers see payback in 12-18 months',
    ],
    objectionHandle: {
      objection: '"We\'ve got other priorities right now."',
      response: 'I get it—there\'s always something. But this isn\'t a cost center, it\'s a profit center. Every month you wait is another month of detention fees, labor inefficiency, and preventable safety incidents. What\'s that costing you today?',
    },
  },
  {
    id: 'safety',
    title: 'Safety Manager',
    icon: '⛑️',
    color: 'red',
    concerns: ['OSHA compliance', 'Accident prevention', 'Documentation for audits', 'Worker protection'],
    pitch: `"Every restraint bypass is logged. Every door-open-without-trailer event is flagged. You'll have the documentation you need before OSHA asks for it."`,
    talkingPoints: [
      'Restraint usage tracked and reported by dock, shift, and worker',
      'Bypass events logged with timestamps—identify training gaps',
      'Interlock sequences can prevent unsafe operations',
      '3-color light communication visible to drivers and workers',
      'Incident data for root cause analysis',
    ],
    objectionHandle: {
      objection: '"We already have safety procedures in place."',
      response: 'Procedures are great—but can you prove they\'re being followed? 25% of warehouse accidents happen at the dock. This gives you the data to verify compliance and the evidence to defend against claims.',
    },
  },
  {
    id: 'maintenance',
    title: 'Maintenance Manager',
    icon: '🔧',
    color: 'amber',
    concerns: ['Equipment uptime', 'Predictive maintenance', 'Parts planning', 'Service scheduling'],
    pitch: `"You'll know when hydraulic fluid is low before the leveler fails. You can schedule maintenance during off-peak hours. Equipment faults display on the controller and log to the cloud."`,
    talkingPoints: [
      'Hydraulic fluid level monitoring with low-level alerts',
      'Cycle counters track equipment usage for PM scheduling',
      'Fault history logs all equipment issues with timestamps',
      'Heatmaps show least-busy hours for maintenance windows',
      'Remote access to equipment status—check before dispatching',
    ],
    objectionHandle: {
      objection: '"My guys know when equipment needs service."',
      response: 'They know when something\'s broken. This tells you when something\'s about to break. Unplanned downtime on a leveler during peak hours costs way more than a scheduled PM at 6am on Sunday.',
    },
  },
  {
    id: 'it',
    title: 'IT Director',
    icon: '💻',
    color: 'purple',
    concerns: ['Integration complexity', 'Security', 'Support burden', 'Scalability'],
    pitch: `"Cloud-based platform with enterprise security. Integrates with your WMS/TMS/ERP. We handle the hardware and software—your team doesn't need to become dock equipment experts."`,
    talkingPoints: [
      'SaaS model—no on-premise servers to maintain',
      'API integrations with major WMS/TMS/ERP platforms',
      'Single sign-on capability',
      'White-glove implementation—we do the heavy lifting',
      'Dedicated customer success team for ongoing support',
    ],
    objectionHandle: {
      objection: '"Another system to manage? We\'re stretched thin as it is."',
      response: 'That\'s exactly why we handle implementation and support. Your team gets one login, one dashboard. And because the hardware and software are integrated, there\'s no finger-pointing when something breaks—one number to call.',
    },
  },
];

export default function Section6Pitches({ onComplete }: Section6Props) {
  const [activeStakeholder, setActiveStakeholder] = useState('distribution');
  const [viewedStakeholders, setViewedStakeholders] = useState<string[]>(['distribution']);
  const [showObjection, setShowObjection] = useState(false);

  const stakeholder = stakeholders.find(s => s.id === activeStakeholder);

  const handleStakeholderChange = (id: string) => {
    setActiveStakeholder(id);
    setShowObjection(false);
    if (!viewedStakeholders.includes(id)) {
      const newViewed = [...viewedStakeholders, id];
      setViewedStakeholders(newViewed);
      
      // Complete section when all stakeholders viewed
      if (newViewed.length === stakeholders.length) {
        onComplete();
      }
    }
  };

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors: Record<string, { bg: string; border: string; text: string; activeBg: string }> = {
      blue: { bg: 'bg-blue-900/30', border: 'border-blue-500', text: 'text-blue-400', activeBg: 'bg-blue-600' },
      green: { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400', activeBg: 'bg-green-600' },
      red: { bg: 'bg-red-900/30', border: 'border-red-500', text: 'text-red-400', activeBg: 'bg-red-600' },
      amber: { bg: 'bg-amber-900/30', border: 'border-amber-500', text: 'text-amber-400', activeBg: 'bg-amber-600' },
      purple: { bg: 'bg-purple-900/30', border: 'border-purple-500', text: 'text-purple-400', activeBg: 'bg-purple-600' },
    };
    return colors[color] || colors.blue;
  };

  if (!stakeholder) return null;

  const colorClasses = getColorClasses(stakeholder.color, true);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Section 6</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          Stakeholder Pitches
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Ready-to-use talking points for each decision-maker at Smithfield.
        </p>
      </div>

      {/* Progress */}
      <div className="text-center text-slate-400 text-sm mb-4">
        {viewedStakeholders.length} of {stakeholders.length} stakeholder profiles reviewed
      </div>

      {/* Stakeholder Selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {stakeholders.map((s) => {
          const colors = getColorClasses(s.color, activeStakeholder === s.id);
          const isViewed = viewedStakeholders.includes(s.id);
          
          return (
            <button
              key={s.id}
              onClick={() => handleStakeholderChange(s.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                ${activeStakeholder === s.id 
                  ? `${colors.activeBg} text-white` 
                  : isViewed
                    ? `${colors.bg} ${colors.text} border ${colors.border}`
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }
              `}
            >
              <span>{s.icon}</span>
              <span className="hidden md:inline">{s.title}</span>
              {isViewed && activeStakeholder !== s.id && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Stakeholder Card */}
      <div className={`${colorClasses.bg} rounded-2xl p-8 border ${colorClasses.border}`}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{stakeholder.icon}</span>
          <div>
            <h2 className={`text-2xl font-bold ${colorClasses.text}`}>{stakeholder.title}</h2>
            <p className="text-slate-400">What they care about</p>
          </div>
        </div>

        {/* Concerns */}
        <div className="flex flex-wrap gap-2 mb-6">
          {stakeholder.concerns.map((concern, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300"
            >
              {concern}
            </span>
          ))}
        </div>

        {/* Main Pitch */}
        <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Your Pitch</h3>
          <blockquote className={`text-xl ${colorClasses.text} font-medium leading-relaxed`}>
            {stakeholder.pitch}
          </blockquote>
        </div>

        {/* Talking Points */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Key Talking Points</h3>
          <ul className="space-y-3">
            {stakeholder.talkingPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className={`w-6 h-6 ${colorClasses.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <svg className={`w-4 h-4 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Objection Handling */}
        {!showObjection ? (
          <button
            onClick={() => setShowObjection(true)}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Show Common Objection & Response
          </button>
        ) : (
          <div className="bg-slate-800 rounded-xl p-6 space-y-4 animate-fadeIn">
            <div>
              <h4 className="text-red-400 font-semibold mb-2">🚫 Common Objection</h4>
              <p className="text-slate-300 italic">"{stakeholder.objectionHandle.objection}"</p>
            </div>
            <div>
              <h4 className="text-green-400 font-semibold mb-2">✅ Your Response</h4>
              <p className="text-slate-300">{stakeholder.objectionHandle.response}</p>
            </div>
          </div>
        )}
      </div>

      {/* Tip Box */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Pro Tip</h3>
            <p className="text-slate-300">
              In a group presentation, watch for head nods and note-taking. The person most engaged is often your champion. 
              After the meeting, follow up with them directly—they'll help sell internally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
