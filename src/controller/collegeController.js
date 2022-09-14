const collegeModel= require("../model/collegeModel")



const college= async function(req,res){
    try {
    
    let data= req.body
    let{name,fullName,logoLink}=data

    if(Object.keys(data).length===0) res.status(400)({status:false, msg:"please use body to create college"})

    if(!name) res.status(400).send({status:false, msg:"name is required"}) 

    let checkName= await collegeModel.find(data)
   
    if(name==checkName.name) return res.status(400).send({status:false,msg:"Name is allready exist, Use unic name"})
    
    if(!fullName) res.status(400).send({status:false, msg:"fullName is required"}) 
    
    if(!logoLink) res.status(400).send({status:false, msg:"Logo ling is required"})
    
    let saveData= await collegeModel.create(data)
    res.status(201).send({data:saveData})

} catch (error) {
    return res.status(500).send({status:false, message:error.message})
}
}


module.exports={college}
