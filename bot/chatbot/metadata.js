const reservartion = require('./prompts/reservation');
const checkIn = require('./prompts/checkIn');
const checkOut = require('./prompts/checkOut');

/**
 * @type {Map<string, { task: string, context:string, examples: [{ input: { content: string }, output: { content: string } }]}>}
 */
const promptsByTask = new Map();
promptsByTask.set(reservartion.task, reservartion);
promptsByTask.set(checkIn.task, checkIn);
promptsByTask.set(checkOut.task, checkOut);

module.exports = {
    tasks: Array.from(promptsByTask.keys()),
    promptsByTask
};