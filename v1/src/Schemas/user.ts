import {model, Schema } from "mongoose";

const userSchema : Schema = new Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        role: {
            enum: ["Basic", "Admin"],
            default: "Baisc"
        },
    }, {
    required: true, timestamps: true
}
);
export const User = model("User", userSchema);