import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/category"

const handler = async (req, res) => {
    const { method } = req
    await mongooseConnect()

    if (method === 'GET') {
        res.json(await Category.find().populate('parent'))
    }

    if (method === 'POST') {
        const { name, parent } = req.body
        const categoryDoc = await Category.create({ name, parent })
        res.json(categoryDoc)
    }

    if (method === 'PUT') {
        const { _id, name, parent } = req.body
        const categoryDoc = await Category.updateOne({ _id }, { name, parent })
        res.json(categoryDoc)
    }

    if (method === 'DELETE') {
        const { _id } = req.query
        const categoryDoc = await Category.deleteOne({ _id })
        res.json(categoryDoc)
    }
}

export default handler