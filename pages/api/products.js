import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/product"

const handler = async (req, res) => {
    const { method } = req
    await mongooseConnect()

    if (method === 'GET') {
        if (req.query?.id) {
            const ProductDoc = await Product.findById(req.query.id)
            res.json(ProductDoc)
            return
        } else {
            res.json(await Product.find())
        }
    }

    if (method === 'POST') {
        const { name, description, price } = req.body
        const ProductDoc = await Product.create({
            name, description, price
        })
        res.json(ProductDoc)
    }

    if (method === 'PUT') {
        const { name, description, price, _id } = req.body
        await Product.updateOne({ _id }, { name, description, price })
        res.json(true) 
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query.id })
            res.json(true)
        }
    }
}

export default handler