'use client';

import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

interface PresentationModeProps {
  onExit: () => void;
}

const slides = [
  {
    id: 'title',
    type: 'title',
    content: {
      title: 'myQ Enterprise',
      subtitle: 'Dock Management Solution',
      tagline: 'Digitize. Automate. Optimize.',
    },
  },
  {
    id: 'problem',
    type: 'content',
    content: {
      title: 'The Challenge',
      points: [
        'Dock operations run on walkie-talkies and sticky notes',
        'No visibility into what\'s actually happening',
        'Detention fees disputed without evidence',
        'Institutional knowledge walks out when people leave',
        'Making million-dollar decisions with thousand-dollar data',
      ],
    },
  },
  {
    id: 'pain-stats',
    type: 'stats',
    content: {
      title: 'The Numbers',
      stats: [
        { value: '56%', label: 'say operating cost is #1 metric' },
        { value: '25%', label: 'of warehouse accidents at dock' },
        { value: '48%', label: 'struggle with worker retention' },
        { value: '$75-150', label: 'per hour detention on reefers' },
      ],
    },
  },
  {
    id: 'solution-overview',
    type: 'content',
    content: {
      title: 'The myQ Enterprise Solution',
      subtitle: 'The only connected hardware/software dock management solution',
      points: [
        'IoT sensors capture data automatically—no manual entry',
        'Real-time visibility from any device',
        'Timestamps that settle disputes',
        'Analytics that drive decisions',
      ],
    },
  },
  {
    id: 'pillars',
    type: 'pillars',
    content: {
      title: 'Four Pillars of Dock Management',
      pillars: [
        { name: 'Appointment', desc: 'Control arrivals', icon: '📅' },
        { name: 'Gate', desc: 'Automate check-in', icon: '🚪' },
        { name: 'Yard', desc: 'Track every trailer', icon: '🚛' },
        { name: 'Dock', desc: 'Sensor-driven ops', icon: '🏭' },
      ],
    },
  },
  {
    id: 'hardware',
    type: 'content',
    content: {
      title: 'Connected Hardware Ecosystem',
      subtitle: 'Not just software—integrated IoT',
      points: [
        'LiftMaster gate & door operators',
        'Poweramp dock levelers',
        'McGuire vehicle restraints',
        'Sensors capture every event automatically',
      ],
      imageId: 'IMG-02',
      imageDesc: 'System architecture diagram',
    },
  },
  {
    id: 'sensors',
    type: 'sensors',
    content: {
      title: 'The Sensor Ecosystem',
      sensors: [
        { name: 'Trailer Present', captures: 'Arrival/departure timestamps' },
        { name: 'Leveler Stored', captures: 'Actual loading time' },
        { name: 'Restraint Engaged', captures: 'Safety compliance' },
        { name: 'Door Open/Closed', captures: 'Energy & security' },
        { name: 'Forklift Activity', captures: 'Worker efficiency' },
      ],
    },
  },
  {
    id: 'dashboard',
    type: 'content',
    content: {
      title: 'Real-Time Analytics',
      points: [
        'Live dock status visible from any device',
        'Detention tracking by carrier',
        'Peak hour heatmaps for staffing',
        'Session-level drill-down for disputes',
      ],
      imageId: 'IMG-06',
      imageDesc: 'Dashboard - real-time dock status',
    },
  },
  {
    id: 'roi',
    type: 'roi',
    content: {
      title: 'The Business Case',
      subtitle: 'Typical annual savings: $200K-$300K',
      items: [
        { metric: '8%', label: 'reduction in outbound labor' },
        { metric: '3%', label: 'increased truck throughput' },
        { metric: '1-3', label: 'FTE reduction in manual tracking' },
        { metric: '$50-100K', label: 'detention fee recovery' },
      ],
      footer: 'Most customers see payback in 12-18 months',
    },
  },
  {
    id: 'food-specific',
    type: 'content',
    content: {
      title: 'Built for Food Distribution',
      points: [
        'Cold chain compliance documentation',
        'Refrigerated trailer prioritization',
        'FSMA audit-ready reporting',
        'Temperature loss alerts',
        'Reefer dwell time tracking',
      ],
    },
  },
  {
    id: 'next-steps',
    type: 'cta',
    content: {
      title: 'Next Steps',
      items: [
        'Site assessment of current dock operations',
        'Identify high-impact quick wins',
        'Custom ROI projection for your facility',
        'Pilot program discussion',
      ],
    },
  },
];

export default function PresentationMode({ onExit }: PresentationModeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = slides[currentSlide];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1));
    } else if (e.key === 'ArrowLeft') {
      setCurrentSlide(Math.max(0, currentSlide - 1));
    } else if (e.key === 'Escape') {
      onExit();
    }
  };

  const renderSlide = () => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
              {slide.content.title}
            </h1>
            <p className="text-2xl md:text-3xl text-blue-400 mb-8">
              {slide.content.subtitle}
            </p>
            <p className="text-xl md:text-2xl">
              <span className="text-blue-400">Digitize.</span>{' '}
              <span className="text-green-400">Automate.</span>{' '}
              <span className="text-purple-400">Optimize.</span>
            </p>
          </div>
        );

      case 'content':
        return (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              {slide.content.title}
            </h2>
            {slide.content.subtitle && (
              <p className="text-xl text-blue-400 mb-8 text-center">{slide.content.subtitle}</p>
            )}
            <ul className="space-y-6">
              {slide.content.points?.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4 text-xl md:text-2xl text-slate-200">
                  <span className="text-blue-400 mt-1">▸</span>
                  {point}
                </li>
              ))}
            </ul>
            {slide.content.imageId && (
              <div className="mt-8">
                <ImagePlaceholder 
                  id={slide.content.imageId}
                  description={slide.content.imageDesc || ''}
                  source=""
                  aspectRatio="16:9"
                />
              </div>
            )}
          </div>
        );

      case 'stats':
        return (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              {slide.content.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {slide.content.stats?.map((stat, idx) => (
                <div key={idx} className="text-center p-6 bg-slate-800/50 rounded-xl">
                  <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                    {stat.value}
                  </div>
                  <p className="text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pillars':
        return (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              {slide.content.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {slide.content.pillars?.map((pillar, idx) => (
                <div key={idx} className="text-center p-8 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="text-5xl mb-4">{pillar.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{pillar.name}</h3>
                  <p className="text-slate-400">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'sensors':
        return (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              {slide.content.title}
            </h2>
            <div className="space-y-4">
              {slide.content.sensors?.map((sensor, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xl font-semibold text-white flex-1">{sensor.name}</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-blue-400">{sensor.captures}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'roi':
        return (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {slide.content.title}
            </h2>
            <p className="text-2xl text-green-400 mb-12">{slide.content.subtitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {slide.content.items?.map((item, idx) => {
                if (typeof item === 'string') return null;
                return (
                  <div key={idx} className="p-6 bg-green-900/20 rounded-xl border border-green-500/30">
                    <div className="text-3xl font-bold text-green-400 mb-2">{item.metric}</div>
                    <p className="text-slate-400 text-sm">{item.label}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-xl text-slate-300">{slide.content.footer}</p>
          </div>
        );

      case 'cta':
        return (
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
              {slide.content.title}
            </h2>
            <div className="space-y-6">
              {slide.content.items?.map((item, idx) => {
                if (typeof item !== 'string') return null;
                return (
                  <div key={idx} className="flex items-center gap-4 p-6 bg-blue-900/20 rounded-xl border border-blue-500/30">
                    <span className="text-2xl font-bold text-blue-400">{idx + 1}</span>
                    <span className="text-xl text-white">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 overflow-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-slate-900 to-transparent z-10">
        <div className="flex items-center gap-4">
          <span className="text-blue-400 font-semibold">myQ Enterprise</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
        <button
          onClick={onExit}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          Exit Presentation
        </button>
      </div>

      {/* Slide Content */}
      <div className="h-full flex items-center justify-center p-8 pt-20 pb-24">
        {renderSlide()}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center gap-4 bg-gradient-to-t from-slate-900 to-transparent">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          className={`
            p-3 rounded-full transition-colors
            ${currentSlide === 0 
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
              : 'bg-slate-700 text-white hover:bg-slate-600'
            }
          `}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`
                w-2 h-2 rounded-full transition-colors
                ${idx === currentSlide ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'}
              `}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
          disabled={currentSlide === slides.length - 1}
          className={`
            p-3 rounded-full transition-colors
            ${currentSlide === slides.length - 1 
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-500'
            }
          `}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-4 right-4 text-slate-600 text-xs">
        Use arrow keys or spacebar to navigate • ESC to exit
      </div>
    </div>
  );
}
