// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         required: [true,"Please provide a username"]
//     },
//     email:{
//         type: String,
//         required: [true,"Please provide an email"]
//     },
//     password: {
//         type: String,
//         required: [true,"Plese provide an email"]
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     },
//     forgotPasswordToken: String,
//     forgotPasswordTokenExpiry: Date,
//     verifyToken: String,
//     verifyTokenExpiry: Date,
// },{timestamps: true})

// const User =mongoose.models.users || mongoose.model("users", userSchema)

// export default User





import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the User attributes
interface IUser {
    username: string;
    email: string;
    password: string;
    isVerified?: boolean;
    isAdmin?: boolean;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
}

// Interface for the User Document incorporating mongoose Document
interface IUserDocument extends IUser, Document {}

// Mongoose Schema
const userSchema = new Schema<IUserDocument>({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, { timestamps: true });

// Mongoose Model
const User: Model<IUserDocument> = mongoose.models.users || mongoose.model<IUserDocument>('users', userSchema);

export default User;
