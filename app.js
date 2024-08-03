const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const userRouter = require("./routes/userRoute")
const app = express();
const cors = require('cors');

app.use(bodyParser.json());

connectDB();

app.use(cors({
    origin: true,
    credentials: true, 
  }));

app.use('/api/users', userRouter); 

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
