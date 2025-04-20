import { User } from "@/app/core/domain/User"
import { UserService } from "@/app/core/services/UserService";
import axios from "axios";
import "reflect-metadata";
import { injectable } from "inversify";

@injectable()
export class UserServiceFromAPI implements UserService {
    async create(user:User):Promise<User> {
        return await axios.post(process.env.API_URL+'/user', user)
                    .then((response) => response.data)
                    .catch((error) => {
                        throw new Error(error)
                    });
    }

    async findById(id:string):Promise<User> {
        return await axios.get(process.env.API_URL+'/user/'+id)
                    .then((response) => response.data)
                    .catch((error) => {
                        throw new Error(error)
                    });
    }

    async findByEmail(email: string):Promise<User> {
        throw new Error('Not implemented');
    }

    async update(user:User):Promise<User> {
        return await axios.put(process.env.API_URL+'/user/'+user.id, user)
                    .then((response) => response.data)
                    .catch((error) => {
                        throw new Error(error)
                    });
    }

    async delete(id:string):Promise<void> {
        await axios.delete(process.env.API_URL+'/user/'+id);
    }
}