"use client"

import Layout from "@/components/Layout"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const New = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [goTOProducts, setGoToProducts] = useState(false)
    const router = useRouter()

    async function createProduct(e) {
        e.preventDefault()
        const data = { name, description, price }
        await axios.post('/api/products', data)
        setGoToProducts(true)
    }

    if (goTOProducts) {
        router.push('/products')
    }

    return (
        <Layout>
            <form className="flex flex-col" onSubmit={createProduct}>
                <h1>New Product</h1>

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
        </Layout>
    )
}

export default New