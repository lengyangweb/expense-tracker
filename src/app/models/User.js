import bcrypt from 'bcryptjs';
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        require: [true, `Username is required`]
    },
    password: {
        type: String,
        require: [true, `Password is required`]
    }
},
{
    timestamps: true
}
);

userSchema.pre('save', function() {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashPassword;
});

// if model is already exist then use model otherwise create a new model
const userModel = (models && models.hasOwnProperty('users')) ? models.users : model("users", userSchema);

export default userModel;