// This is a model for the user

var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 path = require('path');

// Schema
var UserSchema  = mongoose.Schema({
    username:{type:String},
    password:{type:String},
    email:{type:String},
    lastAccess:{type:Date,default:Date.now},
    visits:{type:Number,default:0},
    admin:{type:Boolean,default:false}
});
// Find user function
UserSchema.methods.findUser=function findUser(username){
    return this.model('User').find({username:username});
};

module.exports = mongoose.model('User', UserSchema);
