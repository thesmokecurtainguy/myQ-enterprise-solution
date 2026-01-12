'use client';

import { useState } from 'react';

interface Section7Props {
  onComplete: (score: number) => void;
}

const questions = [
  {
    id: 1,
    category: 'Pain Points',
    question: 'What is the "visibility gap" in food distribution operations?',
    options: [
      { id: 'a', text: 'Not enough security cameras at the dock', correct: false },
      { id: 'b', text: 'Lack of real-time data on dock operations, relying on manual tracking and tribal knowledge', correct: true },
      { id: 'c', text: 'Poor lighting in the warehouse', correct: false },
      { id: 'd', text: 'Drivers can\'t see the dock assignment board', correct: false },
    ],
  },
  {
    id: 2,
    category: 'Pain Points',
    question: 'Why are detention fees especially costly for refrigerated operations?',
    options: [
      { id: 'a', text: 'Refrigerated trailers are bigger and harder to maneuver', correct: false },
      { id: 'b', text: 'Reefer units burn fuel while waiting, adding to detention costs', correct: true },
      { id: 'c', text: 'Cold chain regulations require additional paperwork', correct: false },
      { id: 'd', text: 'Refrigerated drivers get paid more per hour', correct: false },
    ],
  },
  {
    id: 3,
    category: 'Solution Architecture',
    question: 'What makes myQ Enterprise different from software-only dock management solutions?',
    options: [
      { id: 'a', text: 'It\'s cheaper', correct: false },
      { id: 'b', text: 'It has a better user interface', correct: false },
      { id: 'c', text: 'It captures data automatically through IoT sensors, eliminating manual entry', correct: true },
      { id: 'd', text: 'It works without internet connection', correct: false },
    ],
  },
  {
    id: 4,
    category: 'Solution Architecture',
    question: 'Which myQ pillar would you recommend FIRST to solve the "5am truck lineup" problem?',
    options: [
      { id: 'a', text: 'Dock Management', correct: false },
      { id: 'b', text: 'Yard Management', correct: false },
      { id: 'c', text: 'Gate Management', correct: false },
      { id: 'd', text: 'Appointment Management', correct: true },
    ],
  },
  {
    id: 5,
    category: 'Hardware/Sensors',
    question: 'What does the Trailer Present Sensor detect?',
    options: [
      { id: 'a', text: 'The weight of the trailer', correct: false },
      { id: 'b', text: 'The temperature inside the trailer', correct: false },
      { id: 'c', text: 'When a trailer backs into or leaves a dock position', correct: true },
      { id: 'd', text: 'Whether the trailer\'s doors are open', correct: false },
    ],
  },
  {
    id: 6,
    category: 'Hardware/Sensors',
    question: 'Which sensor would trigger an alert for "door open without trailer for 15 minutes"?',
    options: [
      { id: 'a', text: 'Trailer Present Sensor', correct: false },
      { id: 'b', text: 'Door Open Sensor', correct: true },
      { id: 'c', text: 'Leveler Stored Sensor', correct: false },
      { id: 'd', text: 'Forklift Activity Sensor', correct: false },
    ],
  },
  {
    id: 7,
    category: 'Analytics',
    question: 'A carrier disputes detention fees. Which report provides timestamped evidence?',
    options: [
      { id: 'a', text: 'Dock Usage Heatmap', correct: false },
      { id: 'b', text: 'Real-time Facility Overview', correct: false },
      { id: 'c', text: 'Session Timeline with event-level detail', correct: true },
      { id: 'd', text: 'Equipment Fault History', correct: false },
    ],
  },
  {
    id: 8,
    category: 'Analytics',
    question: 'What business value does the Dock Usage Heatmap provide?',
    options: [
      { id: 'a', text: 'Shows which carriers are most reliable', correct: false },
      { id: 'b', text: 'Identifies peak hours for staffing and appointment scheduling', correct: true },
      { id: 'c', text: 'Calculates detention fees by truck', correct: false },
      { id: 'd', text: 'Monitors restraint bypass events', correct: false },
    ],
  },
  {
    id: 9,
    category: 'ROI',
    question: 'What is the typical annual ROI range for a 20+ dock facility?',
    options: [
      { id: 'a', text: '$25,000 - $50,000', correct: false },
      { id: 'b', text: '$50,000 - $100,000', correct: false },
      { id: 'c', text: '$200,000 - $300,000', correct: true },
      { id: 'd', text: '$500,000+', correct: false },
    ],
  },
  {
    id: 10,
    category: 'ROI',
    question: 'Which ROI component often provides the fastest, most tangible payback?',
    options: [
      { id: 'a', text: 'Labor hour reduction', correct: false },
      { id: 'b', text: 'Throughput improvement', correct: false },
      { id: 'c', text: 'Detention fee recovery', correct: true },
      { id: 'd', text: 'Equipment maintenance savings', correct: false },
    ],
  },
];

export default function Section7Assessment({ onComplete }: Section7Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isAnswered = !!answers[question.id];

  const handleAnswer = (answerId: string) => {
    if (!isAnswered) {
      setAnswers({ ...answers, [question.id]: answerId });
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
      const score = calculateScore();
      onComplete(score);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      const selectedAnswer = answers[q.id];
      const isCorrect = q.options.find(o => o.id === selectedAnswer)?.correct;
      if (isCorrect) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 70;

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Section 7</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Assessment Results
          </h1>
        </div>

        <div className={`text-center p-8 rounded-2xl ${passed ? 'bg-green-900/30 border border-green-500/30' : 'bg-amber-900/30 border border-amber-500/30'}`}>
          <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-400' : 'text-amber-400'}`}>
            {score}%
          </div>
          <p className="text-xl text-white mb-2">
            {passed ? '🎉 Congratulations! You passed!' : '📚 Keep studying!'}
          </p>
          <p className="text-slate-400">
            {passed 
              ? 'You\'re ready to present myQ Enterprise to Smithfield.' 
              : 'You need 70% to pass. Review the material and try again.'
            }
          </p>
        </div>

        {/* Question Review */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Question Review</h3>
          {questions.map((q, idx) => {
            const selectedAnswer = answers[q.id];
            const correctOption = q.options.find(o => o.correct);
            const isCorrect = q.options.find(o => o.id === selectedAnswer)?.correct;

            return (
              <div 
                key={q.id}
                className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <div>
                    <p className="text-white font-medium">{idx + 1}. {q.question}</p>
                    {!isCorrect && (
                      <p className="text-slate-400 text-sm mt-1">
                        Correct answer: {correctOption?.text}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Section 7</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
          Final Assessment
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          10 questions • 70% required to pass • Unlimited retakes
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-slate-400 text-sm whitespace-nowrap">
          {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="mb-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            {question.category}
          </span>
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-6">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => {
            let optionClass = 'quiz-option';
            if (isAnswered) {
              if (option.correct) {
                optionClass += ' correct';
              } else if (answers[question.id] === option.id && !option.correct) {
                optionClass += ' incorrect';
              }
            } else if (answers[question.id] === option.id) {
              optionClass += ' selected';
            }

            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={isAnswered}
                className={`${optionClass} w-full text-left`}
              >
                <span className="text-slate-400 mr-3 font-medium">{option.id.toUpperCase()}.</span>
                <span className="text-white">{option.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className={`
            px-4 py-2 rounded-lg font-medium transition-colors
            ${currentQuestion === 0 
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
              : 'bg-slate-700 text-white hover:bg-slate-600'
            }
          `}
        >
          ← Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`
            px-6 py-2 rounded-lg font-medium transition-colors
            ${!isAnswered 
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-500'
            }
          `}
        >
          {isLastQuestion ? 'Submit Assessment' : 'Next →'}
        </button>
      </div>

      {/* Answer Status */}
      <div className="flex justify-center gap-1">
        {questions.map((q, idx) => (
          <div 
            key={q.id}
            className={`
              w-3 h-3 rounded-full transition-colors
              ${idx === currentQuestion 
                ? 'bg-blue-500' 
                : answers[q.id] 
                  ? 'bg-green-500' 
                  : 'bg-slate-700'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
