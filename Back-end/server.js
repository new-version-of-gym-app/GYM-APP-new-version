const express = require('express');
const cors = require('cors');
const authrouter = require('./routes/authroutes.js');
const FeedsRouter = require('./routes/feedroutes.js');
const commentrouter = require('./routes/commentsroutes.js');
const userRoutes = require ('./routes/userRoutes.js')
const coachroute = require('./routes/coachroutes.js')
const app = express();

// CORS setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/', userRoutes);
app.use('/', authrouter);
app.use('/', FeedsRouter);
app.use('/', commentrouter);
app.use('/',coachroute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} !!!`);
});
