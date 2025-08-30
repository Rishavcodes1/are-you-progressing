import * as zod from "zod"

export const setSchemaValidation = zod.object({
    weight: zod
        .number({ error: "weight must be a number" })
        .positive({ error: "weight should be positive" }),
    reps: zod
        .number({ error: "reps must be a number" })
        .positive({ error: "reps should be positive" }),
    alone: zod
        .number({ error: "alone reps must be a number" })
        .positive({ error: "alone reps should be positive" }),
    assisted: zod
        .number({ error: "assisted reps must be a number" })
        .positive({ error: "assisted reps should be positive" })
}).superRefine(
    (data, ctx) => {
        if (data.alone > data.reps) {
            ctx.addIssue({
                code: "custom",
                message: "alone reps should not be more than total reps",
                path: ["alone"]
            })
        }
        if (data.assisted > data.reps) {
            ctx.addIssue({
                code: "custom",
                message: "assisted reps should not be more than total reps",
                path: ["assisted"]
            })
        }
        if (data.alone + data.assisted > data.reps) {
            ctx.addIssue({
                code: "custom",
                message: "alone reps + assisted reps should not be more than total reps",
                path: ["alone"]
            })
            ctx.addIssue({
                code: "custom",
                message: "alone reps + assisted reps should not be more than total reps",
                path: ["assisted"]
            })
        }
    }
)

export const exerciseNameSchemaValidation = zod.object({
    name: zod
        .string()
        .trim()
        .regex(/^[a-zA-Z0-9]+$/, { error: "Exercise name must not contain special characters other than underscore (_)" })
})