
// This is a server-side file.
'use server';

/**
 * @fileOverview Translates product information into a specified language.
 * 
 * - getTranslatedProduct - A function that fetches product details and translates them.
 * - TranslateProductInput - The input type for the translation function.
 * - TranslateProductOutput - The return type for the translation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { ApiProduct } from '@/lib/types';

// Define the input schema for the translation flow
const TranslateProductInputSchema = z.object({
  productId: z.string().describe('The ID of the product to translate.'),
  targetLanguage: z.string().describe('The target language code (e.g., "ja", "zh", "ru", "ar").'),
});
export type TranslateProductInput = z.infer<typeof TranslateProductInputSchema>;

// Define the output schema for the translated product details
const TranslateProductOutputSchema = z.object({
  name: z.string().describe('The translated product name.'),
  description: z.string().describe('The translated product description.'),
  howToUse: z.string().describe('The translated brewing instructions or how-to-use guide.'),
});
export type TranslateProductOutput = z.infer<typeof TranslateProductOutputSchema>;

// This is the main function that will be called from the frontend.
export async function getTranslatedProduct(input: TranslateProductInput): Promise<TranslateProductOutput> {
  // Fetch the original product details first
  const product = await fetchProductById(input.productId);

  if (!product) {
    throw new Error(`Product with ID ${input.productId} not found.`);
  }
  
  // Now, call the Genkit flow to perform the translation
  return translateProductFlow({
    productName: product.product_name,
    productDescription: product.product_description,
    howToUse: product.how_to_use,
    targetLanguage: input.targetLanguage,
  });
}


// Helper function to fetch product details from the existing API
async function fetchProductById(productId: string): Promise<ApiProduct | null> {
  try {
    const response = await fetch(`https://kduserver.payshia.com/products/get-by-id/${productId}`);
    if (!response.ok) {
      console.error(`Failed to fetch product ${productId}: ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    // The API might return an array or an object
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

// Define the schema for the data that will be passed to the prompt
const TranslationPromptInputSchema = z.object({
  productName: z.string(),
  productDescription: z.string(),
  howToUse: z.string(),
  targetLanguage: z.string(),
});

// Define the prompt for the AI model
const translatePrompt = ai.definePrompt({
  name: 'translateProductPrompt',
  input: { schema: TranslationPromptInputSchema },
  output: { schema: TranslateProductOutputSchema },
  prompt: `
    You are a professional translator for an e-commerce website specializing in premium Ceylon tea.
    Translate the following product details into the language specified by the target language code.
    The target language is: {{{targetLanguage}}}

    Original Product Name:
    {{{productName}}}

    Original Product Description:
    {{{productDescription}}}

    Original "How to Use" / Brewing Instructions:
    {{{howToUse}}}

    Please provide the translations for 'name', 'description', and 'howToUse' in the specified JSON format.
    Ensure the translations are accurate, natural-sounding, and appealing to a native speaker of that language.
  `,
});


// Define the Genkit flow that orchestrates the translation
const translateProductFlow = ai.defineFlow(
  {
    name: 'translateProductFlow',
    inputSchema: TranslationPromptInputSchema,
    outputSchema: TranslateProductOutputSchema,
  },
  async (input) => {
    console.log(`Translating to ${input.targetLanguage}: ${input.productName}`);
    
    const { output } = await translatePrompt(input);
    
    if (!output) {
      throw new Error('Translation failed: The AI model did not return any output.');
    }

    console.log('Translation successful:', output);
    return output;
  }
);
