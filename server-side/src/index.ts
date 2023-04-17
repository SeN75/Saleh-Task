import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cros from 'cors'
import router from './router';
import  mongoose from 'mongoose';


const app = express();

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cros({
    origin: process.env.PRODICTION? '': '*'
}))
dotenv.config();

app.use('/',  router)
console.log(process.env.DB_CONNECTION)
if(process.env.DB_CONNECTION)
mongoose.connect( process.env.DB_CONNECTION ).then(() => {
    console.log('db connection')
});

app.listen(
    process.env.PORT, () => {
        console.log(`server running : http://${process.env.HOST}:${process.env.PORT}`)
    }
)