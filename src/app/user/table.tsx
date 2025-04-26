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

import { EditOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { SearchIcon } from "lucide-react"
import NewUser from "./new.user"
import RemoveUser from "./remove.user"

export default function TableUser() {
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
                        <TableRow>
                            <TableCell className="dark:text-white">Eliezer de Almeida</TableCell>
                            <TableCell className="dark:text-white">example@email.com</TableCell>
                            <TableCell className="dark:text-white">Administrador</TableCell>
                            <TableCell className="flex gap-[0.5rem]">
                                <Button className="border-2 border-primary bg-transparent text-primary hover:bg-gray-200 hover:border-gray-700"><EditOutlined /></Button>
                                <RemoveUser user={{name:"Eliezer"}}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}