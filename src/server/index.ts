import { Hono } from 'hono'
const app = new Hono()


app.get('/', (c) => c.json('Hello from Apex Web Solutions! 🚀'))
app.get('/api/health', (c) => c.json('Healthy! 🔥'))

export default app