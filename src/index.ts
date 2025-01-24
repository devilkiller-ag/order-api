import dotenv from "dotenv";
import express from 'express';
import bodyParser from "body-parser";

import { productRoute } from './routes/product';
import { ApiError } from "./utils/ApiError";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


/**
 * Express middleware to parse incoming JSON requests.
 * @function
 */
app.use(bodyParser.json());


/**
 * Mounts the product routes on the /products path.
 * This handles all product-related operations such as viewing and adding products.
 * 
 * @function
 * @route {GET, POST} /products
 */
app.use('/products', productRoute);


/**
 * Starts the server and listens on the specified port.
 * 
 * @function
 * @param {number} PORT - The port on which the server listens.
 * 
 * @returns {void} Logs a message to the console once the server is successfully running.
 */
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT} at http://localhost:${PORT}`);
});


export { app, server };
