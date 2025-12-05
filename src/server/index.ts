import { Hono } from 'hono'
const app = new Hono().basePath('/api')


app.get('/', (c) => c.json('Hello from Apex Web Solutions! 🚀'))
app.get('/health', (c) => c.json('Healthy! 🔥'))
export default app