"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as zod from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AtSignIcon, LockIcon, MailIcon, IdCardIcon, WeightIcon, RulerIcon, Ruler, TargetIcon } from "lucide-react"
import { registerSchemaValidation } from "@/schemas/register.schema"
import { useEffect, useState } from "react"
import { DatePicker } from "./DatePicker"






export default function RegsiterForm() {

    const [step, setStep] = useState(1)
    const [userDetails, setUserDetails] = useState({})

    const validationSchema = [
        registerSchemaValidation.pick({ username: true, email: true, password: true, name: true }),
        registerSchemaValidation.pick({ birthDate: true, height: true }),
        registerSchemaValidation.pick({ initialWeight: true, targetWeight: true }).superRefine((data, ctx) => {
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
        }),
    ]



    const defaultValues = {
        username: "",
        name: "",
        email: "",
        password: "",
        birthDate: "",
        height: "",
        initialWeight: "",
        targetWeight: "",
    }

    const form = useForm({
        resolver: zodResolver(validationSchema[step - 1]),
        defaultValues: defaultValues

    })


    function onSubmit(data: any) {

        let updatedUserDetails = { ...userDetails, ...data }
        setUserDetails(updatedUserDetails)
        if (step < 3) {
            setStep(step + 1)

        }
        else {
            console.log(updatedUserDetails)
        }

    }

    return (


        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {step === 1 &&
                    <>

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">

                                            <Input placeholder={field.name} className="bg-gray-50 py-5 pr-8" {...field} />
                                            <AtSignIcon className="absolute top-[25%] right-2 scale-75 text-muted-foreground" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">

                                            <Input placeholder={field.name} className="bg-gray-50 py-5 pr-8" {...field} />
                                            <IdCardIcon className="absolute top-[25%] right-2 scale-75 text-muted-foreground" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">

                                            <Input placeholder={field.name} className="bg-gray-50  py-5 pr-8" {...field} />
                                            <MailIcon className="absolute top-[25%] right-2 scale-75 text-muted-foreground" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <Input placeholder={field.name} type="text" className="bg-gray-50  py-5 pr-8"  {...field} />
                                            <LockIcon className="absolute top-[25%] right-2 scale-75 text-muted-foreground" />
                                        </div>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                }
                {
                    step === 2 &&
                    <>

                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <DatePicker placeholder={"birth date"} value={field.value} onChange={field.onChange} />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <>

                            <FormField
                                control={form.control}
                                name="height"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl >
                                            <div className="relative">
                                                <Input placeholder={`${field.name} (in cms)`} type="text" className="bg-gray-50  py-5 pr-8"  {...field} />
                                                <Ruler className="absolute top-[25%] right-2 scale-75 text-muted-foreground" />
                                            </div>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    </>
                }
                {
                    step === 3 &&

                    <>

                        <FormField
                            control={form.control}
                            name="initialWeight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
                                        <div className="relative">
                                            <Input placeholder={`current weight (in kgs)`} type="text" className="bg-gray-50  py-5 pr-8"  {...field} />
                                            <WeightIcon className="absolute top-[25%] right-2 scale-75 text-muted-foreground" />
                                        </div>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="targetWeight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
                                        <div className="relative">
                                            <Input placeholder={`target weight (in kgs)`} type="text" className="bg-gray-50  py-5 pr-8"  {...field} />
                                            <TargetIcon className="absolute top-[25%] right-2 scale-75 text-muted-foreground" />
                                        </div>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                }
                <Button type="submit" className="w-full py-5 rounded-[5px] cursor-pointer">{step < 3 ? "next" : "register"}</Button>
            </form>
        </Form>

    )
}