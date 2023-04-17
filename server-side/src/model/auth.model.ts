import { Schema, model } from "mongoose";
import  bcript from 'bcrypt';

export interface IUser  {
    email: string,
    password: string,
    role?: 'ADMIN' | 'USER'
}
export const userSchema = new Schema<IUser>({
    email: {type: String, required: [true, 'email is required'], 
        validate: {
        validator: function(v: string) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
        
    }},
    password: {type: String, required: [true, 'password is required'], minlength: 6},
    role: {type: String, default: 'USER'}
})

userSchema.pre('save' , function(next) {
    if(this.isModified('password')) [
        bcript.hash(this.password, 10, (err, has) => {
            if(err) return next(err)
            this.password = has;
            next();
        })
    ]
})

userSchema.methods.comparePassword = async function (password:string) {
    if(!password) throw new Error('Password is mesing')

    try{
        const res = await bcript.compare(password, this.password)
        return res
    }
    catch(e: any) {
        console.log('An error happend ==> ', e.message)
    }
} 
export const User = model<IUser>('users', userSchema);
 