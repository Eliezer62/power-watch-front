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
import { UserServiceFromAPI } from "../infra/services/UserServiceFromAPI"
import User from "../core/domain/User"
import { UserRole } from "../core/enum/UserRole"
import { toast, Toaster } from "sonner"

const formSchema = z.object({
    name: z.string({required_error:"Nome é obrigatório"})
                .min(3, "Nome deve ter pelo menos 3 caracteres")
                .max(255, "Nome deve ter no máximo 255 caracteres"),
    email: z.string({required_error:"E-mail é obrigatório"}).email("Insira um e-mail válido")
                    .max(255, "E-mail deve ter no máximo 255 caracteres"),
    role: z.string({required_error:"Perfil é obrigatório"})
  })

export default function NewUser() {
    const service = new UserServiceFromAPI();
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
        const user = new User()
                        .setId('')
                        .setName(values.name)
                        .setEmail(values.email)
                        .setRole(values.role as UserRole)
                        .build();
        
        try {
            await service.create(user)
                        .then(() => {
                            toast("Criado com sucesso");
                            setTimeout(() => {
                                setOpen(false);
                                setLoading(false);
                            }, 3000)
                        });
        } catch (error) {
            console.log(error);
            toast(`${error}`);
            setLoading(false);
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Novo Usuário</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Novo Usuário</DialogTitle>
                    <DialogDescription>Adicione um novo usuário ao sistema, a senha inicial é sempre <span className="font-bold">temporaria</span></DialogDescription>
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
                                            <Input placeholder="Nome Completo" {...field} disabled={loading}/>
                                        </FormControl>
                                        <FormDescription>Nome Completo do Usuário</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@example.com" type="email" {...field}  disabled={loading}/>
                                        </FormControl>
                                        <FormDescription>E-mail de acesso do usuário</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Perfil</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}  disabled={loading}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um perfil para o Usuário" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Perfil</SelectLabel>
                                                    <SelectItem value="user">Usuário</SelectItem>
                                                    <SelectItem value="admin">Administrador</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        
                                        <FormDescription>Perfil de Acesso</FormDescription>
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