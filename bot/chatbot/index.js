const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const metadata = require('./metadata');
const Thread = require('./Thread');

const LLM_SETTINGS = {
    model: "models/chat-bison-001",     // required, which model to use to generate the result
    temperature: 0.2,                   // optional, 0.0 always uses the highest-probability result
    candidateCount: 1,                  // optional, how many candidate results to generate
    top_k: 40,                          // optional, number of most probable tokens to consider for generation
    top_p: 0.95,                        // optional, for nucleus sampling decoding strategy
}

class Chatbot {
    /**
     * @type {{ task: string, context:string, examples: [{ input: { content: string }, output: { content: string } }] }}
     */
    prompt;

    /**
     * @type {LLMChain} 
     */
    llm;

    /**
     * @type {Thread}
     */
    thread;

    constructor(task) {
        if (!metadata.promptsByTask.has(task)) { throw new Error('Unsupported task provided'); }
        if (!process.env.GOOGLE_GENERATIVE_AI_TOKEN) { throw new Error('GOOGLE_GENERATIVE_AI_TOKEN is required'); }

        this.prompt = metadata.promptsByTask.get(task);
        this.thread = new Thread();
        this.llm = new DiscussServiceClient({
            authClient: new GoogleAuth().fromAPIKey(process.env.GOOGLE_GENERATIVE_AI_TOKEN)
        })
    }

    async run(query) {
        this.thread.add(query);

        const response = await this.llm.generateMessage({
            ...LLM_SETTINGS,
            prompt: {
                context: this.prompt.context,
                examples: this.examples,
                messages: this.thread.getAll()
            }
        });

        const reply = response[0].candidates[0].content;
        this.thread.add(reply);
        return reply;
    }
}

module.exports = Chatbot;



