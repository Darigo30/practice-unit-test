import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstname: String,
    lastaname: String,
    password: String,
    email: String,
})

export default mongoose.model("User", UserSchema)