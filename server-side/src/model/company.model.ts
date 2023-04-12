import { Schema, model } from "mongoose";

// export type Company
interface ICompany  {
    name_ar: string,
    name_en: string,
    image: string,
    budget: string,

}
const userSchema = new Schema<ICompany>({
    name_ar: {type: String, required: true},
    name_en: {type: String, required: true},
    image: {type: String, required: true}
})

export const User = model<ICompany>('users', userSchema);
