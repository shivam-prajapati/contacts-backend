const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");



//private
const getContacts = asyncHandler(async (req,res)=>{
    const contact = await  Contact.find({user_id: req.user.id});
    res.status(200).json(contact);
})

//private
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    // console.log('inside get by id',contact)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

//private
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    // console.log('inside update by id',contact)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("Can't update different user's Contacts")
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {   new:true    }
    );
    res.status(200).json(updateContact);
})

const createContact =asyncHandler( async(req,res)=>{
    console.log("The request body is : ",req.body);
    const {name, email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    }) 
    res.status(200).json(contact);
})

const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    // console.log(` delete id ${req.params.id} and ${Contact}`)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("Can't delete different user's Contacts")
    }
    const deletd = await Contact.deleteOne(contact);
    res.status(200).json(deletd);
})

module.exports ={
    getContacts,
    getContact,
    deleteContact,
    createContact,
    updateContact
}