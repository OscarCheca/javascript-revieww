import {ValidationError} from "./errors.js";

export class DateTime {
    #date;
    constructor(date = new Date()) {
        const parsedDate = date instanceof Date ? date : new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new ValidationError(`Invalid date ${date}`);
        }
        this.#date = new Date(parsedDate.getTime());
        Object.freeze(this);
    }

    get date() {
        return new Date(this.#date.getTime());
    }

    toISOString() {
        return this.#date.toISOString();
    }

    toString() {
        return this.#date.toString();
    }

    equals(other) {
        return other instanceof DateTime && this.#date.getTime() === other.date.getTime();
    }
}