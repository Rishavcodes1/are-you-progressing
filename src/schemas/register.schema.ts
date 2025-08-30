import * as zod from "zod"

export const usernameValidation = zod
    .string()
    .trim()
    .min(2, { error: "Username should be atlease 2 characters long" })
    .regex(/^[a-zA-Z0-9]+$/, { error: "Username must not contain special characters other than underscore (_)" })


export const registerSchemaValidation = zod.object({
    username: usernameValidation,
    name: zod
        .string()
        .trim()
        .regex(/^[A-Za-z\s]+$/, 'Full name should contain only letters and spaces — no numbers or special characters allowed.'),
    email: zod.email({ error: "Invalid email address" }),
    password: zod
        .string()
        .min(8, { error: "Password must be atleast 8 chacters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, { error: "Password must contain 1 lowercase letter, 1 uppercase letter,1 number and 1 special character" }),
    initialWeight: zod
        .number()
        .positive({ error: "weight must be positive" })
        .gte(30, { error: "Weight must be greater than 10" }),
    targetWeight: zod
        .number()
        .positive({ error: "weight must be positive" }),

    birthDate: zod
        .date()
        .min(new Date("1900-01-01"), { error: "birthdate can't be less than january 1, 1990" })
        .max(new Date(), { error: "birthdate can't be greater than current date" }),

    height: zod
        .number()
        .positive({ error: "height must be positive" })
        .gte(40, { error: "height must be more than 40 cm" })
        .lte(40, { error: "height must be less than 300 cm" })


}).refine(
    (data) => data.targetWeight > data.initialWeight,
    {
        error: "Target weight should be less than current weight",
        path: ["targetWeight"]
    })