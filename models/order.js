import { Schema, model, models } from "mongoose"

const OrderSchema = new Schema(
    {
        line_items: Object,
        name: String,
        email: String,
        phone: String,
        street: String,
        locality: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
        paid: Boolean,
    },
    {
        timestamps: true
    }
)

export const Order = models?.Order || model('Order', OrderSchema)