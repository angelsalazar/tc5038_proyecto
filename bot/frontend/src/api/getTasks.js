import getBaseURL from "../utils/getBaseURL";

/**
 * 
 * @returns {Promise<string[]>}
 */
async function getTasks() {
    const response = await fetch(`${getBaseURL()}/tasks`);
    if (!response.ok) {
        throw new Error('Unable to retrieve tasks');
    }
    const { tasks } = await response.json();
    return tasks;
}

export default getTasks;