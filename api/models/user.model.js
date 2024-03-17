import mongoose from  'mongoose';

const userSchema =new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique: true,
    },
    email :{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fempty-profile-picture&psig=AOvVaw14zL4liOj0ihNSPLHkrFZk&ust=1710412162228000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPiK-4SE8YQDFQAAAAAdAAAAABAE"
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
    
}, {timestamps:true}
);

const User =mongoose.model('User',userSchema);

export default  User;