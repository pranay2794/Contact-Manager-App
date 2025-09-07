const express=require("express")
const router=express.Router();
const validateToken=require('../middlerware/validateTokenHandler');
const {getContacts,getContact,createContact,updateContact,deleteContact} = require('../controller/contactController')

//Token verfication for authorized user
router.use(validateToken);

//get all contacts
router.get("/",getContacts)

//create contact
router.post("/",createContact)

//get contact by id
router.get("/:id",getContact)

//update contact by id
router.put("/:id",updateContact)

//delete contact by id 
router.delete("/:id",deleteContact)


module.exports=router;