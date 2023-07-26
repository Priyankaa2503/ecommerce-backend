const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
const userRoute = require('./routes/user.js')
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