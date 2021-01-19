const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex = require('knex');

const register=require('./controllers/register');
const signIn=require('./controllers/signIn');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHRIZED=0;
const db=knex({
		client: 'pg',
		connection: {
		    host : '127.0.0.1',
		    user : 'postgres',
		    password :'9494',
		    database : 'smartsense'
		}
	});

const app=express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{res.send("its working")});

app.post('/signin',(req,res)=>{ signIn.signInHandler(req,res,db,bcrypt)});
		
app.post('/register', register.registerHandler(db,bcrypt));

app.get('/profile/:id', (req,res)=>{profile.profileHandler(req,res,db)});

app.put('/image', (req,res)=>{image.imageHandler(req,res,db)});
app.post('/imageUrl', (req,res)=>{image.apiCallHandler(req,res)});


app.listen(process.env.PORT || 3000, ()=>{
	console.log('app running on port ${process.env.PORT}')
})
