const authRoute = require("./routes/auth.route.js");
const dashRoute = require("./routes/dash.route.js");
const courseroute = require("./routes/course.route.js");
const examroute = require("./routes/exam.route.js");
const studroute = require("./routes/student.route.js");
const resultroute = require("./routes/result.route.js");
const feedbackroute = require("./routes/feedback.route.js");
const facultyroute = require("./routes/faculty.route.js");
const conductroute = require("./routes/conduct.route.js")
// import authRoute from './routes/auth.route.js'
const cookieParser = require("cookie-parser");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv =require('dotenv')
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//const connectDb = require('./db.js');
const { mongoose } = require("mongoose");


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Enable cookies and other credentials
  }));

app.use(bodyParser.json())




app.use("/auth", authRoute);
app.use("/dash", dashRoute);
app.use("/course",courseroute);
app.use("/exam",examroute);
app.use("/student",studroute);
app.use("/results",resultroute);
app.use("/feedbacks",feedbackroute);
app.use("/faculty",facultyroute);
app.use("/conduct",conductroute);



const connect = async () =>{
try{
    await mongoose.connect(process.env.MONGO);
}
catch (error)
{
    throw error;
}
};

mongoose.connection.on("disconnected",()=>
{
    console.log("MongoDB disconnected")
})
mongoose.connection.on("connected",()=>
    {
        console.log("MongoDB connected")
    })
app.listen(8800,()=>{
    connect()
    console.log("Connected to server")
})
