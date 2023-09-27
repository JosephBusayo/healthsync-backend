import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fname: {
            type: String,
            required: true,
            trim: true,
        },
        lname: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'staff', 'patient'], // Adjust roles as needed
        },
        password: {
            type: String,
            required: true,
        },
    }, { timestamps: true} );

const User = model('User', userSchema);

export default User;
