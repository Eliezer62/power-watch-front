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

import { SearchIcon } from "lucide-react"
import NewDevice from "./new.device"
import { useEffect, useState } from "react"
import { SensorServiceFromAPI } from "../infra/services/SensorServiceFromAPI"
import Sensor from "../core/domain/Sensor"
import EditSensor from "./edit.device"
import RemoveSensor from "./remove.device"

export default function TableUser() {
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [updateTime, setUpdateTime] = useState(0);

    const service = new SensorServiceFromAPI();

    useEffect(() => {
        const timeout = setInterval(() => {
            service.findAll().then((resp) => setSensors(resp));
            setUpdateTime(3000);
            console.log(sensors);
        }, updateTime);

        return () => {
            clearInterval(timeout);
        }
    });
    

    return (
        <div>
            <div className="flex w-[100vw] h-[75px] p-10 items-center flex-row-reverse gap-[24px]">
                <NewDevice />
                <div className="flex ">
                    <Input className="w-[30vw] bg-white dark:text-white"/>
                    <Button><SearchIcon /></Button>
                </div>
            </div>
            <div className="table-user ml-[75px] mr-[15px]">
                <Table className="bg-white dark:bg-gray-950 rounded-md">
                    <TableCaption>Sensores Cadastrados</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead>Local</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { sensors.map((sensor, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="dark:text-white">{sensor.getName()}</TableCell>
                                    <TableCell className="dark:text-white">{sensor.getModel()}</TableCell>
                                    <TableCell className="dark:text-white">{sensor.getLocal()}</TableCell>
                                    <TableCell className="flex gap-[0.5rem]">
                                        <EditSensor sensor = {sensor}/>
                                        <RemoveSensor sensor = {sensor} />
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