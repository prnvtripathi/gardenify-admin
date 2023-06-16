import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/product"

const handler = async (req, res) => {
    const { method } = req
    await mongooseConnect()
    if (method === 'POST') {
        const { name, description, price } = req.body
        const ProductDoc = await Product.create({
            name, description, price
        })
        res.json(ProductDoc)
    }
}

export default handler