'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

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
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast, Toaster } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { SensorServiceFromAPI } from "../infra/services/SensorServiceFromAPI"

import Sensor from "../core/domain/Sensor"
import { SensorStatus } from "../core/enum/SensorStatus"

const formSchema = z.object({
    name: z.string({required_error:"Nome é obrigatório"})
                .min(3, "Nome deve ter pelo menos 3 caracteres")
                .max(255, "Nome deve ter no máximo 255 caracteres"),
    model: z.string({required_error:"Modelo é obrigatório"})
                .min(3, "Modelo deve ter pelo menos 3 caracteres")
                .max(255, "Modelo deve ter no máximo 255 caracteres"),
    local: z.string({required_error:"Local é obrigatório"})
                .min(3, "Local deve ter pelo menos 3 caracteres")
                .max(255, "Local deve ter no máximo 255 caracteres"),
    status: z.string({required_error:"Status é obrigatório"}),
    notes: z.string()
  })

export default function NewDevice() {
    const service = new SensorServiceFromAPI();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        console.log(values);
        const device = new Sensor(null, values.name, values.model, values.notes??null, values.local, values.status as SensorStatus);
        try{
            await service.create(device)
                .then(() => {
                    toast('Criado com sucesso');
                    setTimeout(() => {
                        setOpen(false);
                        setLoading(false);
                    }, 2000)
                })
        }
        catch (error) {
            console.log(error);
            toast(`${error}`);
            setLoading(false);
        }

    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Novo Sensor</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] overflow-y-scroll max-h-screen">
                <DialogHeader>
                    <DialogTitle>Novo Sensor</DialogTitle>
                    <DialogDescription>Adicione um novo sensor ao sistema, antes de iniciar a instalação de um sensor, se faz necessário a adição no sistema</DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Identificador do sensor" {...field} disabled={loading}/>
                                        </FormControl>
                                        <FormDescription>Identificador para o sensor</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Modelo</FormLabel>
                                        <FormControl>
                                            <Input {...field}  disabled={loading}/>
                                        </FormControl>
                                        <FormDescription>Modelo do sensor</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notas</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Notas para o sensor"
                                                {...field}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormDescription>Notas para o sensor</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="local"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Local</FormLabel>
                                        <FormControl>
                                            <Input {...field}  disabled={loading}/>
                                        </FormControl>
                                        <FormDescription>Local de instalação do sensor</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sensor Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}  disabled={loading}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um status para o Sensor" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Sensor Status</SelectLabel>
                                                    <SelectItem value="active">Ativo</SelectItem>
                                                    <SelectItem value="inactive">Inativo</SelectItem>
                                                    <SelectItem value="maintenance">Manutenção</SelectItem>
                                                    <SelectItem value="installation">Instalação</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        
                                        <FormDescription>Status do sensor</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button type="submit"  disabled={loading}>Salvar</Button>
                            </div>
                        </form>
                    </Form>
                    <Toaster />
                </div>
            </DialogContent>
        </Dialog>
    )
}