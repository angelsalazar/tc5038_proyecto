import getBaseURL from "../utils/getBaseURL";
/**
 * @returns {Promise<Void>}
 */
async function dispose() {
    const response = await fetch(`${getBaseURL()}/dispose`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Unable to dispose bot');
    }
    return Promise.resolve();
}

export default dispose;