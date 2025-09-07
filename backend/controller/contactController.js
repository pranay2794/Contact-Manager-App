const Contact=require('../model/contactModel');
const asyncHandler=require('express-async-handler');

//@desc Get all contacts for logged-in user
//@route GET /api/contacts
//@access Private
const getContacts=asyncHandler(async (req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts);
})


//@desc Create new contact for logged-in user
//@route POST /api/contacts
//@access Private
const createContact=asyncHandler(async (req,res)=>{
    const {name,email,phone}=req.body;
    if(!name,!email,!phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const existingContact = await Contact.findOne({ email: req.body.email });
    if (existingContact) {
        return res.status(400).json({ message: "Contact with this email already exists" });
    }
    const contact = await Contact.create({ user_id: req.user.id, name, email, phone });
    res.status(200).json({contact});
})



//@desc Get contact by ID for logged-in user
//@route GET /api/contacts/:id
//@access Private
const getContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findOne({_id:req.params.id,user_id:req.user.id});
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({contact})
})



//@desc Update contact by ID for logged-in user
//@route PUT /api/contacts/:id
//@access Private
const updateContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findOne({_id:req.params.id,user_id:req.user.id});
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact=await Contact.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    res.status(200).json(updatedContact)
})


//@desc Delete contact by ID for logged-in user
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findOne({_id:req.params.id,user_id:req.user.id});
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json(contact)
})

module.exports ={getContacts,createContact,getContact,updateContact,deleteContact};