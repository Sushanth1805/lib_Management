require('dotenv').config();
const path = require('path');
const express = require('express');
const routes = require('./routes/userRoutes');
const error = require('./middlewares/errorMiddleware');
const bookRouter = require('./routes/bookRoutes');
const cors = require('cors')
require('./config/dbConnect')();
const app = express();

//Routes
app.use(express.json());
app.get("/",(req,res) => {
  res.send("API is running...")
  console.log(PORT)
})

app.use('/api/users', routes.userRouter);
app.use('/api/books', bookRouter.bookRouter);

//====Catch Error
app.use(error.notfoundErrorMiddleware);
app.use(error.errorMiddlewareHandler);

const PORT = 4000 || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
