import dotenv from "dotenv";
import express from 'express';
import bodyParser from "body-parser";

import { productRoute } from './routes/product';
import { ApiError } from "./utils/ApiError";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(bodyParser.json());


// Routes
app.get('/', (req, res) => {
  res.send('Order API running successfully!');
});

app.use('/products', productRoute);


// Listen
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} at http://localhost:${PORT}`);
});
