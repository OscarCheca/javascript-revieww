/**
 * Custom error class for domain-specific validation errors.
 */
export class ValidationError extends Error {
    /**
     * Creates a new instance of ValidationError.
     * @param {string}message - The error message describing the validation error
     */
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}