"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { weightSchemaValidation } from "@/schemas/weight.schema"
import axios from "axios"



const Page = () => {
    const form = useForm<z.infer<typeof weightSchemaValidation>>({
        resolver: zodResolver(weightSchemaValidation),
        defaultValues: {
            weight: 0
        }

    })

    async function onSubmit(data: z.infer<typeof weightSchemaValidation>) {
        console.log("clicked")


        try {
            const response = await axios.post("/api/weight/log", { weight: data.weight })
            console.log(response)
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default Page;