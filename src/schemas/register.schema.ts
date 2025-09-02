import * as zod from "zod"

export const usernameValidation = zod
    .string()
    .trim()
    .nonempty({ error: "Username is required" })
    .min(2, { error: "Username should be atleast 2 characters long" })
    .regex(/^[a-zA-Z0-9]+$/, { error: "Username must not contain special characters other than underscore (_)" })


export const registerSchemaValidationBasicDetails = zod.object({

    username: usernameValidation,
    name: zod
        .string()
        .trim()
        .nonempty({ error: "Name is required" })
        .regex(/^[A-Za-z\s]+$/, 'Full name should contain only letters and spaces — no numbers or special characters allowed.'),
    email: zod
        .string()
        .nonempty({ error: "Email is required" })
        .email({ error: "Invalid email address" }),
    password: zod
        .string()
        .nonempty({ error: "Password is required" })
        .min(8, { error: "Password must be atleast 8 chacters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, { error: "Password must contain 1 lowercase letter, 1 uppercase letter,1 number and 1 special character" }),
})

export const registerSchemaValidationBirthDateAndHeight = zod.object({


    birthDate: zod
        .date({ error: "Please select a valid date" })
        .min(new Date("1900-01-01"), { error: "birthdate can't be less than january 1, 1990" })
        .max(new Date(), { error: "birthdate can't be greater than current date" }),


    height: zod.coerce
        .number<number>({ error: "height must be a number" })
        .positive({ error: "enter a valid height" })
        .gte(40, { error: "height must be more than 40 cm" })
        .lte(300, { error: "height must be less than 300 cm" })
})

export const registerSchemaValidationWeights = zod.object({

    initialWeight: zod.coerce
        .number<number>()
        .positive({ error: "enter a valid weight" })
        .gte(30, { error: "Weight must be greater than 30" }),
    targetWeight: zod.coerce
        .number<number>()
        .positive({ error: "enter a valid weight" }),

}).refine(
    (data) => data.targetWeight < data.initialWeight,
    {
        error: "Target weight should be less than current weight",
        path: ["targetWeight"]
    })





export const registerSchemaValidation = zod.object({

    username: usernameValidation,
    name: zod
        .string()
        .trim()
        .nonempty({ error: "Name is required" })
        .regex(/^[A-Za-z\s]+$/, 'Full name should contain only letters and spaces — no numbers or special characters allowed.'),
    email: zod
        .string()
        .nonempty({ error: "Email is required" })
        .email({ error: "Invalid email address" }),
    password: zod
        .string()
        .nonempty({ error: "Password is required" })
        .min(8, { error: "Password must be atleast 8 chacters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, { error: "Password must contain 1 lowercase letter, 1 uppercase letter,1 number and 1 special character" }),
    birthDate: zod.coerce
        .date<Date>({ error: "Please select a valid date" })
        .min(new Date("1900-01-01"), { error: "birthdate can't be less than january 1, 1990" })
        .max(new Date(), { error: "birthdate can't be greater than current date" }).optional(),


    height: zod.coerce
        .number<number>({ error: "height must be a number" })
        .positive({ error: "enter a valid height" })
        .gte(40, { error: "height must be more than 40 cm" })
        .lte(300, { error: "height must be less than 300 cm" }).optional(),
    initialWeight: zod.coerce
        .number<number>()
        .positive({ error: "enter a valid weight" })
        .gte(30, { error: "Weight must be greater than 30" }).optional(),
    targetWeight: zod.coerce
        .number<number>()
        .positive({ error: "enter a valid weight" }).optional(),
}).superRefine((data, ctx) => {
    console.log("working")
    if (data.initialWeight && data.targetWeight) {
        const initial = Number(data.initialWeight);
        const target = Number(data.targetWeight);

        if (!isNaN(initial) && !isNaN(target) && target >= initial) {
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "Target weight must be less than initial weight",
                path: ['targetWeight'],
            })
        }
    }
})