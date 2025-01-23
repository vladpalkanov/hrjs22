import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Booking Service!');
});

app.listen(PORT, () => {
    console.log(`Booking Service is running on http://localhost:${PORT}`);
});
