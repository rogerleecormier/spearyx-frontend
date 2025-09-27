/**
 * AI adapter for RACI inference - pluggable interface for different AI providers
 */

import { getWorkerUrl, WORKER_CONFIG } from '../config/workers';
import type { AIInferenceResult } from '../types/raci';

export interface AIProvider {
  name: string;
  inferRaci(prompt: string): Promise<string>;
}

/**
 * AI model caller - always uses production Cloudflare Worker
 */
export async function callAIModel(prompt: string): Promise<string> {
  const workerUrl = getWorkerUrl('AI_RACI_GENERATOR');

  console.log('🤖 Calling production AI Worker:', workerUrl);
  console.log('📝 Prompt preview:', prompt.substring(0, 100) + '...');

  try {
    const response = await fetch(workerUrl, {
      method: 'POST',
      headers: WORKER_CONFIG.headers,
      body: JSON.stringify({
        description: prompt,
        generateTitleAndRaci: true, // Use the combined title + RACI endpoint
        seedRoles: [], // Will be populated by assignRaciFromDescription
        previousAnswers: {}, // Will be populated by assignRaciFromDescription
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || 'Unknown error';

      // Provide specific error messages for common issues
      if (response.status === 400 && errorMessage.includes('too long')) {
        throw new Error(
          `Description is too long. Please shorten your project description to under 2000 characters total (including context).`
        );
      }

      throw new Error(
        `Worker request failed: ${response.statusText} - ${errorMessage}`
      );
    }

    const result = await response.json();

    // The combined endpoint returns { generatedTitle, roles, tasks, matrix, ... }
    // For RACI generation, we only need the RACI data, not the title
    if (result && result.roles && result.tasks && result.matrix) {
      // Extract only the RACI-related fields for backward compatibility
      const raciResult = {
        roles: result.roles,
        tasks: result.tasks,
        matrix: result.matrix,
        followUpQuestions: result.followUpQuestions || [],
        confidence: result.confidence || 'medium',
        suggestions: result.suggestions || [],
      };
      return JSON.stringify(raciResult);
    }

    // The worker returns the full structured response, so we return it as JSON string
    // for compatibility with the existing parseAIResponse function
    return JSON.stringify(result);
  } catch (error) {
    console.error('❌ Production AI Worker request failed:', error);

    // Fallback to mock data when production worker is unavailable
    console.log('🔄 Using fallback AI response (worker unavailable)...');
    return JSON.stringify({
      roles: [
        { id: `fallback-pm-${Date.now()}`, name: 'Project Manager' },
        { id: `fallback-dev-${Date.now()}`, name: 'Developer' },
        { id: `fallback-qa-${Date.now()}`, name: 'QA Engineer' },
      ],
      tasks: [
        { id: `fallback-planning-${Date.now()}`, name: 'Project Planning' },
        { id: `fallback-development-${Date.now()}`, name: 'Development' },
        { id: `fallback-testing-${Date.now()}`, name: 'Testing' },
      ],
      matrix: {
        [`fallback-planning-${Date.now()}`]: {
          'Project Manager': { R: false, A: true, C: false, I: false },
          Developer: { R: false, A: false, C: true, I: false },
          'QA Engineer': { R: false, A: false, C: false, I: true },
        },
        [`fallback-development-${Date.now()}`]: {
          'Project Manager': { R: false, A: false, C: false, I: true },
          Developer: { R: true, A: true, C: false, I: false },
          'QA Engineer': { R: false, A: false, C: true, I: false },
        },
        [`fallback-testing-${Date.now()}`]: {
          'Project Manager': { R: false, A: false, C: false, I: true },
          Developer: { R: false, A: false, C: true, I: false },
          'QA Engineer': { R: true, A: true, C: false, I: false },
        },
      },
      followUpQuestions: [
        '⚠️ AI Worker unavailable - Deploy your Cloudflare Worker to enable AI features',
      ],
      confidence: 'low',
      suggestions: [
        'Deploy the ai-raci-generator worker to enable AI-powered RACI generation',
        'Update the worker URL in src/config/workers.ts',
        'For now, you can use the demo projects or create RACI matrices manually',
      ],
    });
  }
}

/**
 * Generates a project title using the AI worker's title generation endpoint
 */
export async function generateProjectTitle(
  description: string
): Promise<string> {
  if (!description || !description.trim()) {
    return 'RACI Matrix';
  }

  const workerUrl = getWorkerUrl('AI_RACI_GENERATOR');

  console.log('🤖 Calling AI Worker for title generation:', workerUrl);
  console.log('📝 Description preview:', description.substring(0, 100) + '...');

  try {
    const response = await fetch(workerUrl, {
      method: 'POST',
      headers: WORKER_CONFIG.headers,
      body: JSON.stringify({
        description,
        generateTitleAndRaci: true, // This triggers the combined title + RACI endpoint
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || 'Unknown error';
      throw new Error(
        `Title generation failed: ${response.statusText} - ${errorMessage}`
      );
    }

    const result = await response.json();
    console.log('🤖 AI Worker combined response:', result);
    console.log('🤖 Response type:', typeof result);
    console.log('🤖 Response keys:', Object.keys(result || {}));

    console.log('🤖 Processing combined response:', {
      hasGeneratedTitle: !!result.generatedTitle,
      generatedTitleType: typeof result.generatedTitle,
      hasRoles: !!result.roles,
      hasTasks: !!result.tasks,
      hasMatrix: !!result.matrix,
      allKeys: Object.keys(result || {}),
    });

    // The combined endpoint returns { generatedTitle, roles, tasks, matrix, ... }
    if (
      result &&
      result.generatedTitle &&
      typeof result.generatedTitle === 'string'
    ) {
      console.log(
        '🤖 Found generatedTitle in primary check:',
        result.generatedTitle
      );
      return result.generatedTitle.trim();
    }

    // Handle different response formats
    if (result && typeof result === 'object') {
      // Check if it's a RACI response with a title field
      if (result.roles && result.tasks && result.matrix) {
        if (result.generatedTitle) {
          console.log(
            '🤖 Got combined response with title:',
            result.generatedTitle
          );
          return result.generatedTitle.trim();
        }
        console.log(
          '🤖 Got RACI response without title field, checking alternatives...'
        );

        // Check if title is in a different field
        if (result.title && typeof result.title === 'string') {
          console.log('🤖 Found title in title field');
          return result.title.trim();
        }

        if (result.response && typeof result.response === 'string') {
          console.log('🤖 Found title in response field');
          return result.response.trim();
        }

        if (result.result && typeof result.result === 'string') {
          console.log('🤖 Found title in result field');
          return result.result.trim();
        }

        if (result.output && typeof result.output === 'string') {
          console.log('🤖 Found title in output field');
          return result.output.trim();
        }

        console.log('🤖 No title field found, using fallback');
        return generateFallbackTitle(description);
      }

      // If it doesn't have RACI fields, try alternative title fields
      if (result.title && typeof result.title === 'string') {
        console.log('🤖 Found title in title field (no RACI fields)');
        return result.title.trim();
      }

      if (result.response && typeof result.response === 'string') {
        console.log('🤖 Found title in response field (no RACI fields)');
        return result.response.trim();
      }

      if (result.result && typeof result.result === 'string') {
        console.log('🤖 Found title in result field (no RACI fields)');
        return result.result.trim();
      }

      if (result.output && typeof result.output === 'string') {
        console.log('🤖 Found title in output field (no RACI fields)');
        return result.output.trim();
      }
    }

    console.error('❌ Invalid combined response format. Received:', result);
    throw new Error('Invalid combined response format');
  } catch (error) {
    console.error('❌ Title generation failed:', error);

    // Use a better fallback method that creates meaningful titles
    return generateFallbackTitle(description);
  }
}

/**
 * Generates an improved fallback title when AI fails
 */
function generateFallbackTitle(description: string): string {
  const words = description.toLowerCase().split(/\s+/);

  // Look for key project-related words with better categorization
  const projectKeywords = [
    'project',
    'system',
    'application',
    'platform',
    'website',
    'app',
    'portal',
    'dashboard',
    'tool',
    'solution',
    'service',
    'product',
    'software',
    'database',
    'api',
    'interface',
    'framework',
    'library',
    'module',
    'component',
  ];

  const actionKeywords = [
    'develop',
    'build',
    'create',
    'design',
    'implement',
    'migrate',
    'upgrade',
    'redesign',
    'refactor',
    'optimize',
    'improve',
    'enhance',
    'deploy',
    'launch',
    'integrate',
    'configure',
    'customize',
    'automate',
    'streamline',
    'modernize',
  ];

  const domainKeywords = [
    'e-commerce',
    'ecommerce',
    'crm',
    'erp',
    'hr',
    'hrms',
    'marketing',
    'sales',
    'finance',
    'accounting',
    'customer',
    'user',
    'admin',
    'management',
    'analytics',
    'reporting',
    'inventory',
    'logistics',
    'supply',
    'chain',
    'retail',
    'healthcare',
    'education',
    'learning',
    'training',
    'support',
    'helpdesk',
    'ticketing',
  ];

  const industryKeywords = [
    'healthcare',
    'finance',
    'retail',
    'manufacturing',
    'education',
    'government',
    'nonprofit',
    'startup',
    'enterprise',
    'corporate',
    'business',
    'commercial',
  ];

  // Find the best keywords
  const projectWord = words.find((word) => projectKeywords.includes(word));
  const actionWord = words.find((word) => actionKeywords.includes(word));
  const domainWord = words.find((word) => domainKeywords.includes(word));
  const industryWord = words.find((word) => industryKeywords.includes(word));

  // Create intelligent title combinations
  if (actionWord && projectWord) {
    return `${actionWord.charAt(0).toUpperCase() + actionWord.slice(1)} ${projectWord.charAt(0).toUpperCase() + projectWord.slice(1)}`;
  }

  if (actionWord && domainWord) {
    return `${actionWord.charAt(0).toUpperCase() + actionWord.slice(1)} ${domainWord.charAt(0).toUpperCase() + domainWord.slice(1)}`;
  }

  if (projectWord && domainWord) {
    return `${projectWord.charAt(0).toUpperCase() + projectWord.slice(1)} ${domainWord.charAt(0).toUpperCase() + domainWord.slice(1)}`;
  }

  if (actionWord && industryWord) {
    return `${actionWord.charAt(0).toUpperCase() + actionWord.slice(1)} ${industryWord.charAt(0).toUpperCase() + industryWord.slice(1)}`;
  }

  if (projectWord && industryWord) {
    return `${projectWord.charAt(0).toUpperCase() + projectWord.slice(1)} ${industryWord.charAt(0).toUpperCase() + industryWord.slice(1)}`;
  }

  // Single keyword with context
  if (actionWord) {
    return `${actionWord.charAt(0).toUpperCase() + actionWord.slice(1)} Project`;
  }

  if (projectWord) {
    return `${projectWord.charAt(0).toUpperCase() + projectWord.slice(1)} Development`;
  }

  if (domainWord) {
    return `${domainWord.charAt(0).toUpperCase() + domainWord.slice(1)} System`;
  }

  if (industryWord) {
    return `${industryWord.charAt(0).toUpperCase() + industryWord.slice(1)} Solution`;
  }

  // Enhanced word extraction for meaningful phrases
  const meaningfulWords = words
    .filter(
      (word) =>
        word.length > 3 &&
        ![
          'that',
          'with',
          'from',
          'this',
          'will',
          'have',
          'been',
          'they',
          'them',
          'their',
          'should',
          'would',
          'could',
        ].includes(word) &&
        !word.includes('.') && // Remove file extensions and abbreviations
        isNaN(Number(word)) // Remove numbers
    )
    .slice(0, 4); // Take more words for better context

  if (meaningfulWords.length >= 3) {
    return meaningfulWords
      .map((word, index) => {
        if (index === 0) return word.charAt(0).toUpperCase() + word.slice(1);
        return word;
      })
      .join(' ');
  }

  if (meaningfulWords.length >= 2) {
    return meaningfulWords
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Last resort: use first few meaningful words
  const firstWords = words.filter((word) => word.length > 2).slice(0, 3);
  if (firstWords.length >= 2) {
    return firstWords
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Ultimate fallback
  return 'Project RACI Matrix';
}

/**
 * Main inference function - pluggable interface
 */
export async function inferRaci(
  description: string,
  seedRoles?: string[],
  previousAnswers?: Record<string, string>
): Promise<AIInferenceResult> {
  try {
    const prompt = buildInferencePrompt(
      description,
      seedRoles,
      previousAnswers
    );
    const response = await callAIModel(prompt);
    return parseAIResponse(response);
  } catch (error) {
    console.error('AI inference failed:', error);
    throw new Error('Failed to generate RACI matrix. Please try again.');
  }
}

/**
 * Builds the prompt for AI inference with length validation
 */
function buildInferencePrompt(
  description: string,
  seedRoles?: string[],
  previousAnswers?: Record<string, string>
): string {
  const MAX_TOTAL_LENGTH = 1900; // Leave some buffer for the 2000 char limit

  // Base prompt template (compact version)
  const basePrompt = `You are a project management expert. Generate a RACI matrix based on the description below.

RACI: R=Responsible, A=Accountable (only one per task), C=Consulted, I=Informed

Project Description:
${description}`;

  let additionalContext = '';

  if (seedRoles && seedRoles.length > 0) {
    additionalContext += `\nRoles: ${seedRoles.join(', ')}`;
  }

  if (previousAnswers && Object.keys(previousAnswers).length > 0) {
    additionalContext += '\nContext:';
    Object.entries(previousAnswers).forEach(([question, answer]) => {
      additionalContext += `\nQ: ${question}\nA: ${answer}`;
    });
  }

  const instructions = `

Return JSON: {"roles":[{"id":"","name":""}],"tasks":[{"id":"","name":""}],"matrix":{"task-id":{"Role Name":{"R":false,"A":true,"C":false,"I":false}}},"followUpQuestions":[]}

Rules: Each task needs exactly one Accountable. Include 3-8 roles, 5-12 tasks. Add followUpQuestions only if critical info missing.`;

  // Calculate lengths
  const baseLength = basePrompt.length;
  const instructionsLength = instructions.length;
  const availableForContext =
    MAX_TOTAL_LENGTH - baseLength - instructionsLength;

  // Truncate additional context if needed
  if (additionalContext.length > availableForContext) {
    additionalContext =
      additionalContext.substring(0, availableForContext - 3) + '...';
  }

  const finalPrompt = basePrompt + additionalContext + instructions;

  // Final safety check
  if (finalPrompt.length > MAX_TOTAL_LENGTH) {
    console.warn(
      `⚠️ Prompt length (${finalPrompt.length}) exceeds limit, truncating description...`
    );

    // Calculate how much we need to reduce the description
    const excessLength = finalPrompt.length - MAX_TOTAL_LENGTH;
    const truncatedDescription =
      description.substring(0, description.length - excessLength - 3) + '...';

    return `You are a project management expert. Generate a RACI matrix based on the description below.

RACI: R=Responsible, A=Accountable (only one per task), C=Consulted, I=Informed

Project Description:
${truncatedDescription}${additionalContext}${instructions}`;
  }

  return finalPrompt;
}

/**
 * Parses AI response into structured result
 */
function parseAIResponse(response: string): AIInferenceResult {
  try {
    const parsed = JSON.parse(response);

    // Validate the structure
    if (!parsed.roles || !Array.isArray(parsed.roles)) {
      throw new Error('Invalid roles format');
    }

    if (!parsed.tasks || !Array.isArray(parsed.tasks)) {
      throw new Error('Invalid tasks format');
    }

    if (!parsed.matrix || typeof parsed.matrix !== 'object') {
      throw new Error('Invalid matrix format');
    }

    // Ensure all roles have proper IDs
    parsed.roles = parsed.roles.map((role: unknown, index: number) => {
      const roleObj = role as Record<string, unknown>;
      return {
        id: (roleObj.id as string) || `role-${index}`,
        name: (roleObj.name as string) || `Role ${index + 1}`,
      };
    });

    // Ensure all tasks have proper IDs
    parsed.tasks = parsed.tasks.map((task: unknown, index: number) => {
      const taskObj = task as Record<string, unknown>;
      return {
        id: (taskObj.id as string) || `task-${index}`,
        name: (taskObj.name as string) || `Task ${index + 1}`,
      };
    });

    return {
      roles: parsed.roles,
      tasks: parsed.tasks,
      matrix: parsed.matrix,
      followUpQuestions: parsed.followUpQuestions || [],
    };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    throw new Error('Invalid AI response format');
  }
}

/**
 * Creates a simple AI provider for testing
 */
export function createMockProvider(): AIProvider {
  return {
    name: 'Mock Provider',
    inferRaci: callAIModel,
  };
}

/**
 * Creates a Cloudflare Workers AI provider (placeholder)
 */
export function createCloudflareProvider(
  accountId: string,
  apiToken: string
): AIProvider {
  return {
    name: 'Cloudflare Workers AI',
    inferRaci: async (prompt: string) => {
      // TODO: Implement Cloudflare Workers AI integration
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-2-7b-chat-int8`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: 'You are a project management expert.',
              },
              { role: 'user', content: prompt },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`AI request failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.result?.response || '';
    },
  };
}

/**
 * Creates an OpenAI provider (placeholder)
 */
export function createOpenAIProvider(apiKey: string): AIProvider {
  return {
    name: 'OpenAI',
    inferRaci: async (prompt: string) => {
      // TODO: Implement OpenAI integration
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a project management expert.',
              },
              { role: 'user', content: prompt },
            ],
            max_tokens: 2000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`AI request failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.choices?.[0]?.message?.content || '';
    },
  };
}
