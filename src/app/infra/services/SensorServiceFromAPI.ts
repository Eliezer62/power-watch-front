import Sensor from "@/app/core/domain/Sensor";
import { SensorService } from "@/app/core/services/SensorService";
import axios from "axios";
import { injectable } from "inversify";

@injectable()
export class SensorServiceFromAPI implements SensorService {
    async create(sensor: Sensor): Promise<Sensor> {
        return await axios.post(process.env.NEXT_PUBLIC_API_URL+'/sensor', sensor.toObject())
                        .then((response) => Sensor.fromObject(response.data))
                        .catch((error) => {
                            var message = '';
                            if(error.response) {
                                message = error.response.data?.msg??'';
                            }
                            else message = error.message;
                            throw new Error(message)
                        });
    }

    async findAll(): Promise<Sensor> {
        return await axios.get(process.env.NEXT_PUBLIC_API_UR+'/sensor')
                        .then((response) => response.data.map((data:Object) => Sensor.fromObject(data)));
    }

    async findById(id: string): Promise<Sensor> {
        return await axios.get(process.env.NEXT_PUBLIC_API_UR+'/sensor/'+id)
                        .then((response) => Sensor.fromObject(response.data))
                        .catch((error) => {
                            throw new Error(error)
                        });
    }

    async update(sensor:Sensor):Promise<Sensor> {
        return await axios.put( process.env.NEXT_PUBLIC_API_URL+'/sensor/'+sensor.getId(), sensor.toObject())
                    .then((response) => Sensor.fromObject(response.data))
                    .catch((error) => {
                        throw new Error(error)
                    });
    }

    async delete(id:string):Promise<void> {
        await axios.delete( process.env.NEXT_PUBLIC_API_URL+'/sensor/'+id);
    }
    
}