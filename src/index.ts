import dotenv from "dotenv";
import express from 'express';

import { productRoute } from './routes/product';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Order API running successfully!');
});


app.use('/products', productRoute);


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} at http://localhost:${PORT}`);
});
