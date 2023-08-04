const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')
const productRoute = require('./routes/product.js')
const cartRoute = require('./routes/cart.js')
const orderRoute = require('./routes/order.js')
dotenv.config();
app.use(express.json());
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect( process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

  app.use("/api/user",userRoute)
  app.use("/api/auth",authRoute)
  app.use("/api/products",productRoute)
  app.use("/api/cart",cartRoute)
  app.use("/api/order",orderRoute)