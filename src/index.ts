import express from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import sessionRoutes from './routes/sessionRoutes';
import path from 'path';

const PORT: number = parseInt(process.env.PORT as string) || 8000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Connected to prisma`);
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
});

app.use('/api/session', sessionRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html'))
);

app.all('*', (req, res) => {
  res.status(404).send('ROUTE NOT FOUND');
});
