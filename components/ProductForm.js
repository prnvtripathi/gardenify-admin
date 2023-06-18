"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const ProductForm = ({
    _id,
    name: initialName,
    description: initialDescription,
    price: initialPrice,
}) => {
    const [name, setName] = useState(initialName || '')
    const [description, setDescription] = useState(initialDescription || '')
    const [price, setPrice] = useState(initialPrice || '')
    const [goTOProducts, setGoToProducts] = useState(false)
    const router = useRouter()

    async function saveProduct(e) {
        e.preventDefault()            
        const data = { name, description, price }
        if (_id) {
            // update
            await axios.put('/api/products', { ...data, _id })
        } else {
            // create
            await axios.post('/api/products', data)
        }
        setGoToProducts(true)
    }

    if (goTOProducts) {
        router.push('/products')
    }

    return (
        <form className="flex flex-col" onSubmit={saveProduct}>

            <label>Product Name</label>
            <input
                type="text"
                placeholder="Product name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <label>Product Description</label>
            <textarea
                placeholder="Product description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />


            <label>Price (in INR)</label>
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />

            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}

export default ProductForm