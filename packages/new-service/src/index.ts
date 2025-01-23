import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 6001;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from New Service!');
});

app.listen(PORT, () => {
    console.log(`New Service is running on http://localhost:${PORT}`);
});
