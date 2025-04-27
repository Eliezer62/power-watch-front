import User from "@/app/core/domain/User"
import { UserService } from "@/app/core/services/UserService";
import axios from "axios";
import "reflect-metadata";
import { injectable } from "inversify";

@injectable()
export class UserServiceFromAPI implements UserService {
    async create(user:User):Promise<User> {
        return await axios.post(process.env.NEXT_PUBLIC_API_URL+'/user', user.toObject())
                    .then((response) => User.fromObject(response.data))
                    .catch((error) => {
                        var message = '';
                        if(error.response) {
                            message = error.response.data?.msg??'';
                        }
                        else message = error.message;
                        throw new Error(message)
                    });
    }

    async findAll():Promise<User[]> {
        return await axios.get(process.env.NEXT_PUBLIC_API_URL+'/user')
                            .then((response) => response.data.map((data:Object) => User.fromObject(data)));
    }

    async findById(id:string):Promise<User> {
        return await axios.get( process.env.NEXT_PUBLIC_API_URL+'/user/'+id)
                    .then((response) => User.fromObject(response.data))
                    .catch((error) => {
                        throw new Error("Erro: "+error.message);
                    });
    }

    async findByEmail(email: string):Promise<User> {
        throw new Error('Not implemented');
    }

    async update(user:User):Promise<User> {
        return await axios.put( process.env.NEXT_PUBLIC_API_URL+'/user/'+user.getId(), user.toObject())
                    .then((response) => User.fromObject(response.data))
                    .catch((error) => {
                        throw new Error(error)
                    });
    }

    async delete(id:string):Promise<void> {
        await axios.delete( process.env.NEXT_PUBLIC_API_URL+'/user/'+id);
    }
}