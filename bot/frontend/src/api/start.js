import getBaseURL from "../utils/getBaseURL";

/**
 * @param {string} task
 * @returns {Promise<Void>}
 */
async function start(task) {
    const response = await fetch(`${getBaseURL()}/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task })
    });
    if (!response.ok) {
        throw new Error('Unable to start bot');
    }
    return Promise.resolve();
}

export default start;