import mongoose from "mongoose";
import {genSalt, hash} from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required."],
        unique: true,
    },
    password: {
        type: String,
        required: function(){
            return this.isGoogleUser === true ? false : true
        }, 
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        require: false,
    },
    color: {
        type: Number,
        requierd: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    },
    // isVerified: {
    //     type: Boolean,
    //     default: this.isGoogleUser ? true : false,
    // }
});

userSchema.pre("save", async function(next){
    const salt = await genSalt();
    if(this.isGoogleUser === true){}
    else{
        this.password = await hash(this.password, salt);
    }
    next();
});

const User = mongoose.model("Users", userSchema);

export default User;