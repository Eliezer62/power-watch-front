import { User } from "../domain/User";

export interface UserService {
    save(user:User):Promise<User>;
    findByUUID(uuid: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(user:User):Promise<User>;
    delete(uuid:string):Promise<void>;
}