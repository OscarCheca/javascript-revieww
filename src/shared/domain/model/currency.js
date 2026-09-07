export class Currency {
    static #VALID_CODES = ['USD', 'EUR', 'GBP', 'JPY'];
    #code;

    constructor(code) {
        if (!Currency.#VALID_CODES.includes(code)) {
            throw new Error(`Invalid currency code: ${code} Must be one of ${Currency.#VALID_CODES.length}`);
        }
        this.code = code;
        Object.freeze(this);
    }

    get code() {
        return this.code;
    }

    equals(other) {
        return other instanceof Currency && this.#code === other.code;
    }

    toString() {
        return this.#code;
    }
}