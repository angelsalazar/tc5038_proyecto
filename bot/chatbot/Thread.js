class Thread {
    /**
     * @private
     * @type {[{ content: string }]}
     */
    messages;

    constructor() {
        this.messages = [];
    }

    /**
     * 
     * @param {string} message 
     */
    add(message) {
        this.messages.push({ content: message })
    }

    /**
     * 
     * @returns {[{ content: string }]}
     */
    getAll() {
        return this.messages;
    }
}

module.exports = Thread;