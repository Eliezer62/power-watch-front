import { SensorStatus } from "../enum/SensorStatus";

export default class Sensor {
    #id: string;
    #name: string;
    #model: string;
    #notes: string;
    #local: string;
    #status: SensorStatus;

    constructor(
        id: string,
        name: string,
        model: string,
        notes: string,
        local: string,
        status: SensorStatus,
    ) {
        this.#id = id;
        this.#name = name;
        this.#model = model;
        this.#notes = notes;
        this.#local = local;
        this.#status = status;
    }

    getId(): string {
        return this.#id;
    }

    setId(id: string) {
        this.#id = id;
        return this;
    }

    getName(): string {
        return this.#name;
    }
    
    setName(name: string) {
        this.#name = name;
        return this;
    }

    getModel(): string {
        return this.#model;
    }

    setModel(model: string) {
        this.#model = model;
        return this;
    }

    getNotes(): string {
        return this.#notes;
    }

    setNotes(notes: string) {
        this.#notes = notes;
        return this;
    }

    getLocal(): string {
        return this.#local;
    }

    setLocal(local: string) {
        this.#local = local;
        return this;
    }

    getStatus(): SensorStatus {
        return this.#status;
    }

    setStatus(status: SensorStatus) {
        this.#status = status;
        return this;
    }

    build():Sensor {
        return this;
    }

    toObject():Object {
        return {
            id: this.#id,
            name: this.#name,
            model: this.#model,
            notes: this.#notes,
            local: this.#local,
            status: this.#status,
        }
    }

    fromObject(json:any):Sensor {
        return new Sensor(json.id, json.name, json.model, json.notes, json.local, json.status);
    }
}