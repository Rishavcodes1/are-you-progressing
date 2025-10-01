"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as zod from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchemaValidation } from "@/schemas/login.schema"
import { AtSignIcon, LockIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function LoginForm() {
    // ...
    const form = useForm<zod.infer<typeof loginSchemaValidation>>({
        resolver: zodResolver(loginSchemaValidation),
        defaultValues: {
            identifier: "",
            password: ""
        }

    })

    const router = useRouter()

    async function onSubmit(values: zod.infer<typeof loginSchemaValidation>) {
        const response = await signIn("credentials",
            {
                redirect: false,
                identifier: values.identifier,
                password: values.password
            })

        if (response?.ok) {
            router.push("/")
        }
    }
    return (


        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Username or Email</FormLabel> */}
                            <FormControl>
                                <div className="relative">

                                    <Input placeholder="username or email" className="bg-gray-50 rounded-[5px] py-5 pr-8" {...field} />
                                    <AtSignIcon className="absolute top-[25%] right-2 scale-75 text-muted-foreground" />
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
                            {/* <FormLabel className="text-gray-400">Passwrord</FormLabel> */}
                            <FormControl>
                                <div className="relative">
                                    <Input placeholder="password" type="password" className="bg-gray-50 rounded-[5px] py-5 pr-8"  {...field} />
                                    <LockIcon className="absolute top-[25%] right-2 scale-75 text-muted-foreground" />
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full py-5 rounded-[5px] cursor-pointer">Login</Button>
            </form>
        </Form>

    )
}