import express from 'express';
import cors from 'cors';
import { connectDB } from '../backend/config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import * as path from 'path'; 
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { title } from 'process';

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect DB
connectDB();

// API endpoint
app.use("/", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/", userRouter);
app.use("/api/cart", cartRouter);

// swagger configuration

const options = {
  definition:{
    openapi: '3.0.0',
    info:{
      title:"Food Delivery service application documentation",
      version:'1.0.0',
      description:'API for food delivery service application',
    },
    servers:[{
      url:'http://localhost:4000'
    }
  ]
  },
  apis: [
    './routes/*.js'
  ]
}

const specs = swaggerJSDoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
