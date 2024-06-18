import * as z from "zod";

export const formSchema = z.object({
    model: z.string().min(1, "Model is required"),
    temperature: z
        .number()
        .min(0, "Temperature must be between 0")
        .max(2, "Temperature must be less than 2"),
    prompt: z
        .string()
        .min(50, "Prompt must be at least 50 characters")
        .max(500, "Prompt must be less than 500 characters"),
    type: z.enum(["personal", "brand"], {
        errorMap: () => ({ message: "Type is required" }),
    }),
    tone: z.enum(
        [
            "professional",
            "casual",
            "thoughtful",
            "funny",
            "sarcastic",
            "passionate",
        ],
        {
            errorMap: () => ({ message: "Tone is required" }),
        }
    ),
    emojis: z.boolean(),
});
