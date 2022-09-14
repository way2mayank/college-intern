const internModel= require("../model/internModel")

const intern= async function(req,res){
    try {
    
    let data= req.body
    let {name, mobile, email, collegeName}=data
    if(Object.keys(data).length===0) return res.status(400).send({status:false,message:"please fill the required field"})
    if(!name) return res.status(400).send({status:false, message:"name required"})
    if(!mobile) return res.status(400).send({status:false,message:"Mobile no is required"})
    if(!email) return res.status(400).send({status:false,message:"email is required"})
    
    if(!collegeName) return res.status(400).send({status:false,message:"collegeName is  required"})
    let saveData= await internModel.create(data)
    return res.status(201).send({status:false,data:saveData})

} catch (error) {
    return res.status(500).send({status:false, message:error.message})
}
}

module.exports={intern}