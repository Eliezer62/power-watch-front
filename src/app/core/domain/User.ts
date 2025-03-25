export class User {
    #uuid: string;
    #name: string;
    #email: string;
    #role: string;

    constructor(uuid:string, name:string, email:string, role:string) {
        this.#uuid = uuid;
        this.#name = name;
        this.#email = email;
        this.#role = role;
    }

    getUUID(): string {
        return this.#uuid;
    }

    setUUID(uuid: string) {
        this.#uuid = uuid;
    }
 
    getName(): string {
        return this.#name;
    }

    setName(name: string) {
        this.#name = name;
    }

    getEmail(): string {
        return this.#email;
    }

    setEmail(email:string) {
        this.#email = email;
    }

    getRole():string {
        return this.#role;
    }

    setRole(role: string) {
        this.#role = role;
    }
}