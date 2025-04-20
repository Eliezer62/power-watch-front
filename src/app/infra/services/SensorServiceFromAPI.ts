import { Sensor } from "@/app/core/domain/Sensor";
import { SensorService } from "@/app/core/services/SensorService";
import axios from "axios";
import { injectable } from "inversify";

@injectable()
export class SensorServiceFromAPI implements SensorService {
    async create(sensor: Sensor): Promise<Sensor> {
        return await axios.post(process.env.API_URL+'/sensor', sensor)
                        .then((response) => response.data)
                        .catch((error) => {
                            throw new Error(error)
                        });
    }

    async findById(id: string): Promise<Sensor> {
        return await axios.get(process.env.API_URL+'/sensor/'+id)
                        .then((response) => response.data)
                        .catch((error) => {
                            throw new Error(error)
                        });
    }

    async update(sensor: Sensor): Promise<Sensor> {
        return await axios.put(process.env.API_URL+'/sensor/'+sensor.id, sensor)
                        .then((response) => response.data)
                        .catch((error) => {
                            throw new Error(error)
                        });
    }

    async delete(id: string): Promise<void> {
        await axios.delete(process.env.API_URL+'/sensor/'+id);
    }
    
}