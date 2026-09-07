import {ValidationError} from "../../../shared/domain/model/errors.js";
import {Money} from "../../../shared/domain/model/money.js";

export class Supplier {
    #id;
    #name;
    #contactEmail;
    #lastOrderTotalPrice;

    constructor({id, name, contactEmail = null, lastOrderTotalPrice = null}) {
    }

    changeName(newName) {
        if (typeof newName !== 'string' || newName.length < 2 || newName.length > 100) {
            throw new ValidationError(`Invalid Supplier name: ${newName}. Must be a string between 2 and 100 characters.`);
        }
        this.#name = newName;
    }

    updateEmail(newEmail) {
        if (!this.#isValidEmail(newEmail)) {
            throw new ValidationError(`Invalid Supplier email: ${newEmail}. Must be a valid email address.`);
        }
        this.#contactEmail = newEmail;
    }

    #isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    recordOrder(orderTotal) {
        if (!(orderTotal instanceof Money)) {
            throw new ValidationError(`Invalid order total: ${orderTotal}. Must be an instance of Money.`);
        }
        this.#lastOrderTotalPrice = orderTotal;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get contactEmail() {
        return this.#contactEmail;
    }

    get lastOrderTotalPrice() {
        return this.#lastOrderTotalPrice;
    }
}