import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Adjust according to your client URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('MongoDB connected');
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
