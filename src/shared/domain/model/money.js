import {ValidationError} from "./errors.js";
import {Currency} from "./currency.js";

export class Money {
    #amount;
    #currency;

    constructor({ amount, currency }) {
        if (!Number.isFinite(amount) || amount < 0) {
            throw new ValidationError('Amount must be a positive number');
        }
        if (!(currency instanceof Currency)) {
            throw new ValidationError('Currency must be a valid instance of Currency');
        }
        this.#amount = Number(amount.toFixed(2));
        this.#currency = currency;
        Object.freeze(this);
    }

    get amount() {
        return this.#amount;
    }

    get currency() {
        return this.#currency;
    }

    add(other) {
        if (!(other instanceof Money) || !this.#currency.equals(other.currency)) {
            throw new ValidationError('Can only add Money of the same currency');
        }
        return new Money({
            amount: this.#amount + other.amount,
            currency: this.#currency
        });
    }

    multiply(multiplier) {
        if (!Number.isFinite(multiplier) || multiplier < 0) {
            throw new ValidationError('Multiplier must be a positive number');
        }
        return new Money({
            amount: this.#amount * multiplier,
            currency: this.#currency
        });
    }

    toString() {
        return `${this.#amount} ${this.#currency.code}`;
    }

    equals(other) {
        return (other instanceof Money &&
            this.#amount === other.amount &&
            this.#currency.equals(other.currency));
    }
}