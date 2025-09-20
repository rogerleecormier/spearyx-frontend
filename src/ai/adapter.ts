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
async function callAIModel(prompt: string): Promise<string> {
  const workerUrl = getWorkerUrl('AI_RACI_GENERATOR');

  console.log('🤖 Calling production AI Worker:', workerUrl);
  console.log('📝 Prompt preview:', prompt.substring(0, 100) + '...');

  try {
    const response = await fetch(workerUrl, {
      method: 'POST',
      headers: WORKER_CONFIG.headers,
      body: JSON.stringify({
        description: prompt,
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
