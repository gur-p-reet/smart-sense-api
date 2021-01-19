
const profileHandler=(req,res,db)=>{
	const {id}=req.params;
	db.select('*').from('users').where({id})
		.then(user=>{
			if(user.length>0){
				res.json(user[0]);
			}else{
				res.status(400).json('Not getting user')
			}
		})
	.catch(res=>res.status(400).json('Not getting user'))
}
module.exports={
	profileHandler:profileHandler

}