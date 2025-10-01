import * as zod from "zod"

export const weightSchemaValidation = zod.object({
    weight: zod.coerce
        .number<number>({ error: "weight must be a number" })
        .positive({ error: "weight should be positive" })
})