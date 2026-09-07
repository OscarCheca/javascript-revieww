import {PurchaseOrderId} from "../../../shared/domain/model/purchase-order-id.js";
import {ValidationError} from "../../../shared/domain/model/errors.js";

export class PurchaseOrderItem {
    #orderId;
    #productId;
    #quantity;
    #unitPrice;

    constructor({orderId, productId, quantity, unitPrice}) {
        if (!orderId instanceof PurchaseOrderId) {
            throw new ValidationError(`Invalid orderId: ${orderId}. Must be an instance of PurchaseOrderId.`);
        }
        if (!productId instanceof ProductId) {
            throw new ValidationError(`Invalid productId: ${productId}. Must be an instance of ProductId.`);
        }
        if (!Number.isInteger(quantity) || quantity <= 0 || quantity > 1000) {
            throw new ValidationError(`Invalid quantity: ${quantity}. Must be a positive integer between 1 and 1000.`);
        }
        if (!(unitPrice instanceof Money)) {
            throw new ValidationError(`Invalid unitPrice: ${unitPrice}. Must be an instance of Money.`);
        }
        this.#orderId = orderId;
        this.#productId = productId;
        this.#quantity = quantity;
        this.#unitPrice = unitPrice;
        Object.freeze(this);
    }

    get orderId() {
        return this.#orderId;
    }

    get productId() {
        return this.#productId;
    }

    get quantity() {
        return this.#quantity;
    }

    get unitPrice() {
        return this.#unitPrice;
    }

    calculateSubtotal() {
        return this.#unitPrice.multiply(this.#quantity);
    }
}