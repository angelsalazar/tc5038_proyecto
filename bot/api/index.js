const metadata = require('../chatbot/metadata');
const Chatbot = require('../chatbot');

module.exports = (express) => {
    const router = express.Router();
    /**
     * @type {null | Chatbot}
     */
    let singleton = null;

    router.get('/tasks', (_, res) => {
        res.status(200).json({
            tasks: metadata.tasks 
        });
    })

    router.post('/start', (req, res) => {
        let payload = { status: 204, error: null, stack: null };

        try {
            singleton = new Chatbot(req.body.task);
        } catch (ex) {
            payload.status = 500;
            payload.error = ex.message;
            payload.stack = ex.stack;
        } finally {
            if (payload.error) {
                res.status(payload.status).json(payload)
            } else {
                res.status(payload.status).end()
            }
        }
    })

    router.post('/prompt', async (req, res) => {
        let payload = { status: 200, reply: null, error: null, stack: null };

        try {
            const { query } = req.body;

            if (!singleton) { throw new Error('chat bot has not initialized'); }
            if (!query || query.length === 0) { throw new Error('query is required'); }

            payload.reply = await singleton.run(query);
        } catch (ex) {
            payload.status = 400;
            payload.error = ex.message;
            payload.stack = ex.stack;
        } finally {
            res.status(payload.status).json(payload);
        }
        
    })

    router.delete('/dispose', (req, res) => {
        singleton = null;
        res.status(204).end();
    })

    return router;
}