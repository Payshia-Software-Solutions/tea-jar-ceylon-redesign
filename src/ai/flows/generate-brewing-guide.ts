// This is a server-side file.
'use server';

/**
 * @fileOverview Generates personalized brewing guides for tea.
 *
 * - generateBrewingGuide - A function that generates a brewing guide based on tea type and user preferences.
 * - BrewingGuideInput - The input type for the generateBrewingGuide function.
 * - BrewingGuideOutput - The return type for the generateBrewingGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BrewingGuideInputSchema = z.object({
  teaType: z.string().describe('The type of tea (e.g., Green, Black, Oolong).'),
  userPreferences: z.string().describe('The user\u0027s taste preferences (e.g., strong, mild, sweet).'),
  brewingMethod: z.string().describe('The user\u0027s preferred brewing method (e.g., teapot, infuser, gaiwan).'),
});

export type BrewingGuideInput = z.infer<typeof BrewingGuideInputSchema>;

const BrewingGuideOutputSchema = z.object({
  brewingGuide: z.string().describe('Detailed brewing instructions based on tea type and user preferences, considering the brewing method.'),
});

export type BrewingGuideOutput = z.infer<typeof BrewingGuideOutputSchema>;

export async function generateBrewingGuide(input: BrewingGuideInput): Promise<BrewingGuideOutput> {
  return generateBrewingGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'brewingGuidePrompt',
  input: {schema: BrewingGuideInputSchema},
  output: {schema: BrewingGuideOutputSchema},
  prompt: `You are an expert tea brewer. Generate a personalized brewing guide for the following tea type and user preferences, taking into account the selected brewing method:\n
Tea Type: {{{teaType}}}
User Preferences: {{{userPreferences}}}
Brewing Method: {{{brewingMethod}}}

Include specific instructions for water temperature, steeping time, and any other relevant factors to optimize the flavor for the given tea type, user preferences, and brewing method.\n
Ensure the guide is easy to follow and provides a delightful tea experience.\n`,
});

const generateBrewingGuideFlow = ai.defineFlow(
  {
    name: 'generateBrewingGuideFlow',
    inputSchema: BrewingGuideInputSchema,
    outputSchema: BrewingGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
