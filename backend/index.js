const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');

dotenv.config();
const app=express();
app.use(cookieParser());
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, // Allow credentials
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const adminRoutes = require('./routes/admin-routes');
const studentRoutes = require('./routes/student-routes');
const teacherRoutes = require('./routes/teacher-routes');
const authRoutes = require('./routes/auth-routes');



app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,

}).then(()=>app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
}))
.catch((err)=>console.log(err));