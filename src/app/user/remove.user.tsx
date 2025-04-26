
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { MinusCircleOutlined } from "@ant-design/icons"

export default function RemoveUser(props:any) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="border-2 border-red-400 bg-transparent text-red-400 hover:bg-gray-200 hover:border-red-700"><MinusCircleOutlined /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Remover este usuário <span className="font-bold">{props.user.name}</span> não poderá ser revertido
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}