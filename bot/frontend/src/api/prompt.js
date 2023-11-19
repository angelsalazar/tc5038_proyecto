import getBaseURL from "../utils/getBaseURL";

/**
 * @param {string} query
 * @returns {Promise<string>}
 */
async function prompt(query) {
    const response = await fetch(`${getBaseURL()}/prompt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
    });
    if (!response.ok) {
        throw new Error('Unable to process query');
    }
    return response.json();
}

export default prompt;