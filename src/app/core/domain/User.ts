import { UserRole } from "../enum/UserRole";

export default class User {
    #id: string;
    #name: string;
    #email: string;
    #role: UserRole;

    constructor(id: string, name: string, email: string, role: UserRole) {
        this.#id = id;
        this.#name = name;
        this.#email = email;
        this.#role = role;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getEmail() {
        return this.#email;
    }

    getRole() {
        return this.#role;
    }

    setId(id: string) {
        this.#id = id;
        return this;
    }

    setName(name: string) {
        this.#name = name;
        return this;
    }

    setEmail(email: string) {
        this.#email = email;
        return this;
    }

    setRole(role: UserRole) {
        this.#role = role;
        return this;
    }

    build() {
        return this;
    }
}