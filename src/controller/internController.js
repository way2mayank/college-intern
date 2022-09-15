const internModel = require("../model/internModel");
const collegeModel = require("../model/collegeModel");
const { isValid, isValidValue } = require("../controller/collegeController")




const createIntern = async function (req, res) {
  try {
    let data = req.body;
    const { name, email, mobile, collegeName } = data;

    if (!isValid(data))
      return res.status(400).send({ status: false, message: "Please Wrire required data to create Intern" });

    if (!name)
      return res.status(400).send({ status: false, message: "Name is required" });


    if ((!isValidValue(name)) || (!name.match(/^[ ]*[a-zA-Z][a-zA-Z\s]{0,35}[a-zA-Z][ ]*$/)))
      return res.status(400).send({ status: false, message: "Name should be in letters" });

    if (!email)
      return res.status(400).send({ status: false, message: "email is required" });

    if (!isValidValue(email))
      return res.status(400).send({ status: false, message: "emailId must be in string" });

    if (!email.match(/\S+@\S+\.\S+/))
      return res.status(400).send({ status: false, message: "Please use valid emailId" });

    if (!mobile) return res.status(400).send({ status: false, message: "mobile is required" });

    if (!isValidValue(mobile))
      return res.status(400).send({ status: false, message: "mobile is in wrong format" });

    if (!mobile.match(/^\d{10}$/))
      return res.status(400).send({ status: false, message: "mobile is invalid" });

    let internEmail = await internModel.findOne({ $or: [{ email: email }, { mobile: mobile }], });

    if (internEmail)
      return res.status(400).send({ status: false, message: "Email or Mobile number is allready used, try another.", });

    if (!collegeName)
      return res.status(400).send({ status: false, message: "collegeName is required" });

    if (!isValidValue(collegeName))
      return res.status(400).send({ status: false, message: "collegeName should be in string" });

    let college = await collegeModel.findOne({ $or: [{ name: collegeName }, { fullName: collegeName }], isDeleted: false, }).select({ _id: 1 });
    if (!college) return res.status(400).send({ status: false, message: "college not exists" });

    data.collegeId = college._id;

    let intern = await internModel.create(data);
    return res.status(201).send({ status: true, data: intern });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createIntern };