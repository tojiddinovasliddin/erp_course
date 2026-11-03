class ErrorExteption extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
        this.name = 'ErrorExteption'
    }
}

export default ErrorExteption
