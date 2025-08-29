
'use server'

import { z } from 'zod'
import { analyzeSpendingHabits } from '@/ai/flows/analyze-spending-habits'
import type { AnalyzeSpendingHabitsOutput } from '@/ai/flows/analyze-spending-habits'

const schema = z.object({
  transactions: z.string(),
  // In the future, you can add a file field here:
  // file: z.any().optional(), 
}).refine(data => data.transactions.length > 0 /* || data.file */, {
    message: "Please provide transaction details or upload a file.",
    path: ["transactions"], // You can decide where to show the error
});


export type FormState = {
  success: boolean
  message: string
  data?: AnalyzeSpendingHabitsOutput
}

export async function getFinancialAnalysis(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    transactions: formData.get('transactions'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.errors[0].message,
    }
  }

  // If there are no transactions, we can assume a file was intended for upload.
  // We can return a pending or success state without calling the AI.
  if (!validatedFields.data.transactions) {
      // TODO: Handle file processing logic here in the future
      return { success: true, message: 'File is being processed.' };
  }

  try {
    const result = await analyzeSpendingHabits({ transactions: validatedFields.data.transactions })
    if (result.summary && result.recommendations) {
        return { success: true, message: 'Analysis successful.', data: result }
    } else {
        return { success: false, message: 'Analysis failed to generate content.' }
    }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'An unexpected error occurred on the server.' }
  }
}
