import { z } from "zod"

export const eventSchema = z.object({
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự").max(200),
  description: z.string().max(1000).optional(),
  status: z.enum(["draft", "active", "closed"]).default("active"),
})

export const questionSchema = z.object({
  event_id: z.string().uuid("Event ID không hợp lệ"),
  title: z.string().min(5, "Tiêu đề phải có ít nhất 5 ký tự").max(500),
  content: z.string().max(5000).optional(),
})

export const answerSchema = z.object({
  question_id: z.string().uuid("Question ID không hợp lệ"),
  content: z.string().min(5, "Câu trả lời phải có ít nhất 5 ký tự").max(5000),
})

export const voteSchema = z.object({
  question_id: z.string().uuid().optional(),
  answer_id: z.string().uuid().optional(),
  vote_type: z
    .number()
    .int()
    .refine((val) => val === 1 || val === -1),
})

export type EventInput = z.infer<typeof eventSchema>
export type QuestionInput = z.infer<typeof questionSchema>
export type AnswerInput = z.infer<typeof answerSchema>
export type VoteInput = z.infer<typeof voteSchema>
