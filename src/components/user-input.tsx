"use client"

import React, { useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from '@/schemas/form-schema'
import { useForm } from 'react-hook-form'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Slider } from '@/components/ui/slider'
import { Input } from "@/components/ui/input"
import Meta from './icons/meta'
import Mistral from './icons/mistral'
import { Info, Loader2 } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'
import { generateBio } from '@/actions'
import useStore from '@/zustand/store'

export const UserInput = () => {
    const [loading, setLoading] = useState(false)
    const { bioList, setBioList } = useStore()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            model: "llama3-8b-8192",
            temperature: 1,
            prompt: "",
            type: "personal",
            tone: "casual",
            emojis: false
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        const userInput = `
            User Input: ${values.prompt},
            Bio Tone: ${values.tone},
            Bio Type: ${values.type},
            Add Emojis: ${values.emojis},
        `
        try {
            const { data } = await generateBio(userInput, values.model, values.temperature);
            console.log(data.data)
            setBioList(data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div className='relative flex flex-col items-start gap-8'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-start gap-6">
                    <fieldset className='grid gap-6 rounded-md border p-4 bg-background/10 backdrop-blur-sm'>
                        <legend className='-ml-1 px-1 text-sm font-medium'>Settings</legend>
                        <div className='grid gap-3'>
                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a model" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="llama3-8b-8192">
                                                    <div className='flex items-start gap-3 text-muted-foreground'>
                                                        <Meta className="size-5" />
                                                        <div>
                                                            <p>
                                                                <span className='text-foreground font-medium mr-2'>LLaMA3</span>
                                                                8B
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="mixtral-8x7b-32768">
                                                    <div className='flex items-start gap-3 text-muted-foreground'>
                                                        <Mistral className="size-5" />
                                                        <div>
                                                            <p>
                                                                <span className='text-foreground font-medium mr-2'>Mixtral</span>
                                                                8x7b
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="llama3-70b-8192">
                                                    <div className='flex items-start gap-3 text-muted-foreground'>
                                                        <Meta className="size-5" />
                                                        <div>
                                                            <p>
                                                                <span className='text-foreground font-medium mr-2'>LLaMA3</span>
                                                                70B
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='grid gap-3'>
                            <FormField
                                control={form.control}
                                name="temperature"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center justify-between pb-2'>
                                            <span className='flex items-center justify-center'>
                                                Creativity
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Info className="w-4 h-4 ml-2 cursor-pointer" />
                                                    </TooltipTrigger>
                                                    <TooltipContent
                                                        sideOffset={25}
                                                        collisionPadding={20}
                                                        className='max-w-sm'
                                                    >
                                                        <p>A higher setting produces more creative and surprising bios, while a lower setting sticks to more predictable and conventional styles.</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </span>
                                            <span>{value}</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Slider defaultValue={[1]} min={0} max={2} step={0.1} onValueChange={(val) => onChange(val[0])} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </fieldset>
                    <fieldset className='grid gap-6 rounded-md border p-4 bg-background/10 backdrop-blur-sm'>
                        <legend className='-ml-1 px-1 text-sm font-medium'>User Input</legend>
                        <div className='grid gap-3'>
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center justify-between pb-2'>About Yourself</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Add your old bio or new prompt here.." {...field} className='min-h-[8rem]' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="personal">
                                                    Personal
                                                </SelectItem>
                                                <SelectItem value="brand">
                                                    Brand
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tone</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select tone" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="professional">
                                                    Professional
                                                </SelectItem>
                                                <SelectItem value="casual">
                                                    Casual
                                                </SelectItem>
                                                <SelectItem value="thoughtful">
                                                    Thoughtful
                                                </SelectItem>
                                                <SelectItem value="funny">
                                                    Funny
                                                </SelectItem>
                                                <SelectItem value="sarcastic">
                                                    Sarcastic
                                                </SelectItem>
                                                <SelectItem value="passionate">
                                                    Passionate
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='grid gap-3'>
                            <FormField
                                control={form.control}
                                name="emojis"
                                render={({ field }) => (
                                    <FormItem className='flex items-center'>
                                        <FormLabel className='text-sm mr-4'>Add Emojis</FormLabel>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} className='!my-0' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </fieldset>
                    <Button type='submit' disabled={loading}>
                        {loading ? <Loader2 className='w-5 h-5 animate-spin' /> : "Generate"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
