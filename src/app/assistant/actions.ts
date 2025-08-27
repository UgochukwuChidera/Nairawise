'use server'

import { z } from 'zod'
import { analyzeSpendingHabits } from '@/ai/flows/analyze-spending-habits'
import type { AnalyzeSpendingHabitsOutput } from '@/ai/flows/analyze-spending-habits'

const schema = z.object({
  transactions: z.string().min(50, 'Please provide more transaction details for a better analysis.'),
})

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

  try {
    const result = await analyzeSpendingHabits(validatedFields.data)
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
