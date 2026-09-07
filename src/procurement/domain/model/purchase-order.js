import {ValidationError} from "../../../shared/domain/model/errors.js";
import {PurchaseOrderId} from "../../../shared/domain/model/purchase-order-id.js";
import {DateTime} from "../../../shared/domain/model/date-time.js";
import {PurchaseOrderState} from "./purchase-order-state.js";
import {PurchaseOrderItem} from "./purchase-order-item.js";
import {Money} from "../../../shared/domain/model/money.js";

export class PurchaseOrder {
    #MAX_ITEMS = 50;
    #id;
    #supplierId;
    #currency;
    #orderDate;
    #items;
    #state;

    constructor({ supplierId, currency, orderDate}) {
        if(!supplierId) {
            throw new ValidationError(`Supplier ID is required`);
        }
        if (!currency) {
            throw new ValidationError(`Currency is required`);
        }
        this.#id = PurchaseOrderId.generate();
        this.#supplierId = supplierId;
        this.#currency = currency;
        this.#orderDate = orderDate instanceof DateTime ? orderDate : new DateTime();
        this.#items = [];
        this.#state = new PurchaseOrderState();
    }

    addItem({ productId, quantity, unitPrice }) {
        if (!this.#state.isDraft()) {
            throw new ValidationError(`Cannot add items to a purchase order that is not in draft state`);
        }
        if (this.#items.length >= this.#MAX_ITEMS) {
            throw new ValidationError(`Cannot add more than ${this.#MAX_ITEMS} items to a purchase order`);
        }
        if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
            throw new ValidationError(`Unit price must be a positive number`);
        }
        this.#items.push(
            new PurchaseOrderItem({
                orderId: this.#id,
                productId,
                quantity,
                unitPrice: new Money({amount: unitPrice, currency: this.#currency})
            })
        );
    }

    calculateTotalPrice() {
        if (this.#items.length === 0) {
            throw new ValidationError(`Cannot calculate total price for a purchase order with no items`);
        }
        return this.#items
            .reduce((sum, item) => sum.add(item.calculateSubtotal()),
                new Money({amount: 0, currency: this.#currency}));
    }

    submit() {
        this.#state = this.#state.toSubmittedFrom(this.#state);
    }
}