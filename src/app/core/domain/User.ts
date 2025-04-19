import { UserRole } from "../enum/UserRole";

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    role: UserRole
}