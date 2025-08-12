'use server';

import { generateBrewingGuide, type BrewingGuideInput } from '@/ai/flows/generate-brewing-guide';
import { z } from 'zod';

const BrewingFormSchema = z.object({
  teaType: z.string(),
  userPreferences: z.enum(['strong', 'mild', 'sweet']),
  brewingMethod: z.enum(['teapot', 'infuser', 'gaiwan']),
});

export interface BrewingGuideState {
    guide?: string;
    error?: string;
}

export async function getBrewingGuide(
  prevState: BrewingGuideState,
  formData: FormData
): Promise<BrewingGuideState> {
  if (formData.get('reset')) {
    return {};
  }
  
  try {
    const validatedFields = BrewingFormSchema.safeParse({
      teaType: formData.get('teaType'),
      userPreferences: formData.get('userPreferences'),
      brewingMethod: formData.get('brewingMethod'),
    });

    if (!validatedFields.success) {
      return { error: 'Invalid input. Please select all options.' };
    }

    const input: BrewingGuideInput = validatedFields.data;
    const result = await generateBrewingGuide(input);

    if (result.brewingGuide) {
      return { guide: result.brewingGuide };
    } else {
      return { error: 'Could not generate a guide. Please try again.' };
    }
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred.' };
  }
}
