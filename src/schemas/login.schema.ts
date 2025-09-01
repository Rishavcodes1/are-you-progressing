import * as zod from "zod"

export const loginSchemaValidation = zod.object({
    identifier: zod.string(),
    password: zod.string()
})