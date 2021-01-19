const Clarifai=require('clarifai');

const app = new Clarifai.App({
	apiKey: '1d48784fd659498dbbd0796501b16402'
});
const apiCallHandler=(req,res)=>{
	console.log(req.body.input)
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json('Unable to work with Api'))
}

const imageHandler=(req,res,db)=>{
const {id}=req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json('unable to get entries'))
}
module.exports={
	imageHandler:imageHandler,
	apiCallHandler:apiCallHandler
}