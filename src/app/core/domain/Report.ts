import { Sensor } from "./Sensor";

export interface Report {
    id: string,
    timestamp: Date,
    voltage: number,
    sensor:Sensor
}