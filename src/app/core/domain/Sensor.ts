import { SensorStatus } from "../enum/SensorStatus";

export interface Sensor {
    id: string,
    name: string,
    model: string,
    notes: string,
    local: string,
    status: SensorStatus
}