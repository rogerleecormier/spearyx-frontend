/**
 * Description Panel Component - Project description input + AI Q&A
 */

import { AlertCircle, CheckCircle, Info, Loader2, MessageCircle, Send, SkipForward, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

interface QuestionQueueItem {
  question: string;
  answer?: string;
  status: 'pending' | 'answered' | 'skipped';
}

interface DescriptionPanelProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  onGenerateRaci: (description: string, answers?: Record<string, string>) => Promise<void>;
  followUpQuestions?: string[];
  isGenerating?: boolean;
  className?: string;
}

export const DescriptionPanel: React.FC<DescriptionPanelProps> = ({
  description,
  onDescriptionChange,
  onGenerateRaci,
  followUpQuestions = [],
  isGenerating = false,
  className = ''
}) => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [questionsQueue, setQuestionsQueue] = useState<QuestionQueueItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [previouslyAskedQuestions, setPreviouslyAskedQuestions] = useState<Set<string>>(new Set());

  // Helper function to normalize questions for comparison
  const normalizeQuestion = React.useCallback((question: string): string => {
    return question
      .toLowerCase()
      .trim()
      .replace(/[?.!,;:]/g, '') // Remove punctuation
      .replace(/\s+/g, ' '); // Normalize whitespace
  }, []);

  // Helper function to check if a question is similar to any previously asked
  const isQuestionSimilar = React.useCallback((newQuestion: string, previousQuestions: Set<string>): boolean => {
    const normalized = normalizeQuestion(newQuestion);
    
    // Check for exact match first
    if (previousQuestions.has(normalized)) {
      return true;
    }
    
    // Check for similar questions (simple word overlap check)
    const newWords = new Set(normalized.split(' ').filter(word => word.length > 3));
    
    for (const prevQuestion of previousQuestions) {
      const prevWords = new Set(prevQuestion.split(' ').filter(word => word.length > 3));
      const commonWords = [...newWords].filter(word => prevWords.has(word));
      
      // If 70% or more words overlap, consider it similar
      const overlapRatio = commonWords.length / Math.min(newWords.size, prevWords.size);
      if (overlapRatio >= 0.7 && commonWords.length >= 2) {
        return true;
      }
    }
    
    return false;
  }, [normalizeQuestion]);

  const handleGenerate = async () => {
    if (!description.trim()) {
      return;
    }

    // Check if description might be too long (rough estimate including context)
    const answeredQuestions = questionsQueue
      .filter(q => q.status === 'answered')
      .reduce((acc, q) => ({ ...acc, [q.question]: q.answer! }), {});
    
    const contextLength = Object.entries(answeredQuestions)
      .reduce((sum, [q, a]) => sum + q.length + a.length, 0);
    
    const estimatedTotalLength = description.length + contextLength + 800; // 800 for prompt overhead
    
    if (estimatedTotalLength > 1900) {
      console.warn(`⚠️ Content may be too long (${estimatedTotalLength} chars estimated). AI worker will truncate if needed.`);
    }

    try {
      await onGenerateRaci(description, answeredQuestions);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  // Function to clear question history (useful for fresh starts)
  const clearQuestionHistory = React.useCallback(() => {
    setPreviouslyAskedQuestions(new Set());
    setQuestionsQueue([]);
    setShowQuestionnaire(false);
    console.log('🧹 Cleared question history');
  }, []);

  const handleAnswerQuestion = (answer: string) => {
    if (!answer.trim()) return;

    const currentQuestion = questionsQueue[currentQuestionIndex];
    if (!currentQuestion) return;

    // Add this question to the previously asked set since it's being processed
    const updatedPreviousQuestions = new Set(previouslyAskedQuestions);
    updatedPreviousQuestions.add(normalizeQuestion(currentQuestion.question));
    setPreviouslyAskedQuestions(updatedPreviousQuestions);

    // Update the question in the queue with the answer
    const updatedQueue = questionsQueue.map((q, index) => 
      index === currentQuestionIndex 
        ? { ...q, answer: answer.trim(), status: 'answered' as const }
        : q
    );
    setQuestionsQueue(updatedQueue);
    setCurrentAnswer('');

    // Move to next pending question or trigger regeneration
    const nextPendingIndex = updatedQueue.findIndex((q, index) => 
      index > currentQuestionIndex && q.status === 'pending'
    );

    if (nextPendingIndex !== -1) {
      setCurrentQuestionIndex(nextPendingIndex);
    } else {
      // No more pending questions, trigger regeneration with all answered questions
      const answeredQuestions = updatedQueue
        .filter(q => q.status === 'answered')
        .reduce((acc, q) => ({ ...acc, [q.question]: q.answer! }), {});
      
      // Add all remaining questions to previously asked set
      updatedQueue.forEach(q => {
        updatedPreviousQuestions.add(normalizeQuestion(q.question));
      });
      setPreviouslyAskedQuestions(updatedPreviousQuestions);
      
      // Clear the questions completely after regeneration
      setShowQuestionnaire(false);
      setQuestionsQueue([]);
      onGenerateRaci(description, answeredQuestions);
    }
  };

  const handleSkipQuestion = () => {
    const currentQuestion = questionsQueue[currentQuestionIndex];
    if (!currentQuestion) return;

    // Add this question to the previously asked set since it's being processed (skipped)
    const updatedPreviousQuestions = new Set(previouslyAskedQuestions);
    updatedPreviousQuestions.add(normalizeQuestion(currentQuestion.question));
    setPreviouslyAskedQuestions(updatedPreviousQuestions);

    // Mark current question as skipped
    const updatedQueue = questionsQueue.map((q, index) => 
      index === currentQuestionIndex 
        ? { ...q, status: 'skipped' as const }
        : q
    );
    setQuestionsQueue(updatedQueue);

    // Move to next pending question or trigger regeneration
    const nextPendingIndex = updatedQueue.findIndex((q, index) => 
      index > currentQuestionIndex && q.status === 'pending'
    );

    if (nextPendingIndex !== -1) {
      setCurrentQuestionIndex(nextPendingIndex);
    } else {
      // No more pending questions, trigger regeneration with answered questions only
      const answeredQuestions = updatedQueue
        .filter(q => q.status === 'answered')
        .reduce((acc, q) => ({ ...acc, [q.question]: q.answer! }), {});
      
      // Add all remaining questions to previously asked set
      updatedQueue.forEach(q => {
        updatedPreviousQuestions.add(normalizeQuestion(q.question));
      });
      setPreviouslyAskedQuestions(updatedPreviousQuestions);
      
      // Clear the questions completely after regeneration
      setShowQuestionnaire(false);
      setQuestionsQueue([]);
      if (Object.keys(answeredQuestions).length > 0) {
        onGenerateRaci(description, answeredQuestions);
      }
    }
  };

  const handleUpdateQueue = () => {
    const answeredQuestions = questionsQueue
      .filter(q => q.status === 'answered')
      .reduce((acc, q) => ({ ...acc, [q.question]: q.answer! }), {});
    
    // Add all questions to previously asked set since we're processing the entire queue
    const updatedPreviousQuestions = new Set(previouslyAskedQuestions);
    questionsQueue.forEach(q => {
      updatedPreviousQuestions.add(normalizeQuestion(q.question));
    });
    setPreviouslyAskedQuestions(updatedPreviousQuestions);
    
    // Clear the questions completely after regeneration
    setShowQuestionnaire(false);
    setQuestionsQueue([]);
    onGenerateRaci(description, answeredQuestions);
  };

  // Initialize questions queue when new follow-up questions arrive
  React.useEffect(() => {
    if (followUpQuestions.length > 0) {
      // Filter out questions that have been asked before
      const filteredQuestions = followUpQuestions.filter(question => 
        !isQuestionSimilar(question, previouslyAskedQuestions)
      );
      
      if (filteredQuestions.length > 0) {
        const newQueue: QuestionQueueItem[] = filteredQuestions.map(question => ({
          question,
          status: 'pending' as const
        }));
        
        // DON'T add questions to previously asked set here - wait until they're processed
        setQuestionsQueue(newQueue);
        setCurrentQuestionIndex(0);
        setShowQuestionnaire(true);
        setCurrentAnswer('');
        
        console.log(`🔍 Filtered ${followUpQuestions.length - filteredQuestions.length} duplicate questions, showing ${filteredQuestions.length} new questions`);
      } else {
        console.log('🚫 All follow-up questions have been asked before, skipping questionnaire');
      }
    }
  }, [followUpQuestions, previouslyAskedQuestions, isQuestionSimilar, normalizeQuestion]);

  // Get current question
  const currentQuestion = questionsQueue[currentQuestionIndex];
  const pendingQuestionsCount = questionsQueue.filter(q => q.status === 'pending').length;
  const answeredQuestionsCount = questionsQueue.filter(q => q.status === 'answered').length;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Project Description</h2>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">AI-Powered</span>
            <div className="relative group">
              <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
              <div className="absolute right-0 top-6 w-80 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                <div className="space-y-2">
                  <p className="font-medium">Intelligent RACI Matrix Generation</p>
                  <p>
                    Our advanced AI analyzes your project description to automatically generate comprehensive RACI matrices. 
                    The system considers team structure, project phases, and stakeholder relationships to create accurate role assignments.
                  </p>
                  <p>
                    When additional context is needed, the AI asks targeted follow-up questions to ensure the most precise 
                    responsibility mapping for your specific project requirements.
                  </p>
                </div>
                {/* Tooltip arrow */}
                <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Input */}
        <div>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Describe your project, team structure, and key stakeholders. Include information about roles, responsibilities, and project phases. The more detail you provide, the better the AI can generate your RACI matrix.

Example: 'We are developing a mobile app for e-commerce with a team including a project manager, product owner, 3 developers, 2 QA engineers, and a UI/UX designer. The project involves requirements gathering, design, development, testing, and deployment phases.'"
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            aria-label="Project description"
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                {description.length}/2000 characters
              </span>
              {previouslyAskedQuestions.size > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-600">
                    {previouslyAskedQuestions.size} questions remembered
                  </span>
                  <button
                    onClick={clearQuestionHistory}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                    title="Clear question history to allow previously asked questions again"
                  >
                    clear
                  </button>
                </div>
              )}
            </div>
            {description.length > 1500 && (
              <span className={`text-xs flex items-center gap-1 ${
                description.length > 1800 ? 'text-red-600' : 'text-amber-600'
              }`}>
                <AlertCircle className="w-3 h-3" />
                {description.length > 1800 
                  ? 'Very long - may be truncated by AI' 
                  : 'Getting long - consider shortening'
                }
              </span>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={!description.trim() || isGenerating}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isGenerating ? 'Generating...' : 'Generate from Description'}
          </button>
        </div>

        {/* AI Questionnaire */}
        {showQuestionnaire && questionsQueue.length > 0 && currentQuestion && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-blue-900">
                      AI Assistant needs more information
                    </h3>
                    <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">
                      {currentQuestionIndex + 1} of {questionsQueue.length}
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-xs text-blue-800">
                      Progress: {answeredQuestionsCount} answered, {pendingQuestionsCount} pending
                    </div>
                    <div className="flex-1 bg-blue-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(answeredQuestionsCount / questionsQueue.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4 font-medium">
                    {currentQuestion.question}
                  </p>
                  
                  {/* Answer Input */}
                  <div className="space-y-3">
                    <textarea
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (currentAnswer.trim()) {
                            handleAnswerQuestion(currentAnswer);
                          }
                        }
                      }}
                    />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button
                          onClick={handleSkipQuestion}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
                        >
                          <SkipForward className="w-3 h-3" />
                          Skip this question
                        </button>
                        {answeredQuestionsCount > 0 && (
                          <button
                            onClick={handleUpdateQueue}
                            className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 px-2 py-1 rounded hover:bg-green-50"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Update with {answeredQuestionsCount} answers
                          </button>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowQuestionnaire(false)}
                          className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => handleAnswerQuestion(currentAnswer)}
                          disabled={!currentAnswer.trim()}
                          className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-3 h-3" />
                          Send Answer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

