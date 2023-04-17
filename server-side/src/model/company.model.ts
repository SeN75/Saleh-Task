import { Int32 } from "mongodb";
import { Schema, model } from "mongoose";

// export type Company
interface ICompany {
  name_ar: string;
  name_en: string;
  image: string;
  budget: number;
  created_at: Date
}
const companySchema = new Schema<ICompany>({
  name_ar: {
    type: String,
    required: true,
    validate: {
      validator: function (name: string) {
        return (/^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F0-9 ]+$/).test(name);
      },
      message: "only arabic letters accepted",
    },
  },
  name_en: {
    type: String,
    required: true,
    validate: {
      validator: function (name: string) {
        return (/^[a-zA-Z0-9 ]+$/).test(name);
      },
      message: "only english letters accepted",
    },
  },
  image: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (img: string) {
    //     return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm.test(
    //       img
    //     );
    //   },
    //   message: 'invalid url'
    // },
  },
  budget: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: new Date(),
  }
});

export const Company = model<ICompany>("Companys", companySchema);
