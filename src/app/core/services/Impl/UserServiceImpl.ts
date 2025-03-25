import { User } from "../../domain/User";
import { UserService } from "../UserService";
import axios, { AxiosResponse } from 'axios';

export class UserServiceImpl implements UserService{
    async save(user: User): Promise<User> {
        return await axios.post('localhost:8000/api/user', user)
                    .then((response: AxiosResponse) => response.data)
                    .catch((error: AxiosResponse) => {
                        throw new Error("Can't save user, reason: "+error)
                    }
                )
    }


    async findByUUID(uuid: string): Promise<User> {
        return await axios.get('localhost:8000/api/user/'+uuid)
                    .then((response: AxiosResponse) => response.data)
                    .catch((error: AxiosResponse) => {
                        throw new Error("Can't find user, reason: "+error)
                    })
    }
    

    async findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }


    async update(user: User): Promise<User> {
        return await axios.put('localhost:8000/api/user/'+user.getUUID(), user)
                    .then((response: AxiosResponse) => response.data)
                    .catch((error: AxiosResponse) => {
                        throw new Error("Can't update the user, reason: "+error)
                    })
    }


    async delete(uuid: string): Promise<void> {
        await axios.delete('localhost:8000/api/user/'+uuid);
    }

}