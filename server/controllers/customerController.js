
const Customer = require('../models/Customer');
const mongoose = require ('mongoose');

exports.homepage = async (req,res) =>{
    const messages = await req.flash('info');
        const locals= {
            title: 'NodeJs',
            description :'free nodejs user management system' 
        }
        try {
            const customers = await Customer.find({}).limit(22);
            res.render('index',{ locals , messages , customers });  

            
        } catch (error) {
            console.log(error);
            
        }
  
}
//Get new customer form 
exports.addCustomer = async (req,res) =>{
  
    const locals= {
        title: 'Add new customer - Nodejs',
        description :'free nodejs user management system' 
    }
    res.render('customer/add',locals); 

}
//post/create new customer
exports.postCustomer = async (req,res) =>{
    console.log(req.body)
    const newCustomer = new Customer({
        firstName :req.body.firstName,
        lastName :req.body.lastName,
        details:req.body.details,
        tel:req.body.tel,
        email:req.body.email


    });
    try {
        await Customer.create(newCustomer)
        await req.flash ('info' , 'New customer has been added .')
        res.redirect('/'); 
        
    } catch (error) {
        console.log(error);
        
    }
};


// Get customer Data 
exports.view = async (req,res) =>{
    try {
        const customer = await Customer.findOne({_id : req.params.id});
        const locals= {
            title: 'View customer data',
            description :'free nodejs user management system' 
            
        
    } 
    res.render('customer/view',{ locals, customer });

    } catch (error) {
        console.log(error);
        
    }
}
//Edit customer Data 
exports.edit = async (req,res) =>{
    try {
        const customer = await Customer.findOne({_id : req.params.id});
        const locals= {
            title: 'Edit customer data',
            description :'free nodejs user management system' 
            
        
    } 
    res.render('customer/edit',{ locals, customer });

    } catch (error) {
        console.log(error);
        
    }
}
//Update customer Data
exports.editPost = async (req,res) =>{
    try {
        await Customer.findByIdAndUpdate(req.params.id,{
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            tel : req.body.tel,
            email : req.body.email,
            details : req.body.details,
            updatedAt : Date.now()
        })

        res.redirect(`/edit/${req.params.id}`);
        console.log('redirected');
    } catch (error) {
        console.log(error);
        
    }
}
//Delete customer Data
exports.deleteCustomer = async (req,res) =>{
    try {
        await Customer.deleteOne({_id : req.params.id});
        res.redirect('/');
        
    } catch (error) {
        console.log(error);
        
        
    }
   
}
//Search customer
exports.searchCustomer = async (req,res) =>{
    const locals= {
        title: 'Search customer Data',
        description :'free nodejs user management system' 
    }
  
   try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    const customers = await Customer.find({
        $or: [
            {firstName: {$regex: new RegExp(searchNoSpecialChar , "i")}},
            {lastName: {$regex: new RegExp(searchNoSpecialChar , "i")}},
        ] 

    });
    res.render("customer/search", {
        customers , locals
    })
    
   } catch (error) {
    console.log(error);
    
    
   }
}

