import {generateUuid, validateUuid} from "./uuid.js";
import {ValidationError} from "./errors.js";

export class PurchaseOrderId {
    #value;

    constructor(value) {
        if (!validateUuid(value)) {
            throw new ValidationError(`Invalid PurchaseOrderId: ${value}. Must be a valid UUID`);
        }
        this.#value = value;
        Object.freeze(this);
    }

    get value() {
        return this.#value;
    }

    static generate() {
        return new PurchaseOrderId(generateUuid());
    }

    equals(other) {
        return other instanceof PurchaseOrderId && this.#value === other.value;
    }

    toString() {
        return this.#value;
    }
}