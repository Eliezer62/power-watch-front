'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { EditOutlined } from "@ant-design/icons"
import { SearchIcon } from "lucide-react"
import NewUser from "./new.user"
import RemoveUser from "./remove.user"
import { useEffect, useState } from "react"
import { UserServiceFromAPI } from "../infra/services/UserServiceFromAPI"
import User from '@/app/core/domain/User'

export default function TableUser() {
    const [users, setUsers] = useState<User[]>([]);
    const [updateTime, setUpdateTime] = useState(0);

    const service = new UserServiceFromAPI();

    useEffect(() => {
        const timeout = setInterval(() => {
            service.findAll().then((resp) => setUsers(resp));
            setUpdateTime(3000);
        }, updateTime);

        return () => {
            clearInterval(timeout);
        }
    });
    

    return (
        <div>
            <div className="flex w-[100vw] h-[75px] p-10 items-center flex-row-reverse gap-[24px]">
                <NewUser />
                <div className="flex ">
                    <Input className="w-[30vw] bg-white dark:text-white"/>
                    <Button><SearchIcon /></Button>
                </div>
            </div>
            <div className="table-user ml-[75px] mr-[15px]">
                <Table className="bg-white dark:bg-gray-950 rounded-md">
                    <TableCaption>Usuários Cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead>Perfil</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="dark:text-white">{user.name}</TableCell>
                                    <TableCell className="dark:text-white">{user.email}</TableCell>
                                    <TableCell className="dark:text-white">{user.role}</TableCell>
                                    <TableCell className="flex gap-[0.5rem]">
                                        <Button className="border-2 border-primary bg-transparent text-primary hover:bg-gray-200 hover:border-gray-700"><EditOutlined /></Button>
                                        <RemoveUser user={{name:user.name}}/>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}