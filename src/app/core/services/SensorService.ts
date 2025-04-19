import { Sensor } from "../domain/Sensor"

export interface SensorService {
    create(sensor:Sensor):Promise<Sensor>

    findById(id:string):Promise<Sensor>

    update(sensor:Sensor):Promise<Sensor>

    delete(id:string):Promise<void>
}