"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { FiUpload } from "react-icons/fi"

const ProductForm = ({
    _id,
    name: initialName,
    description: initialDescription,
    price: initialPrice,
    images: initialImages,
}) => {
    const [name, setName] = useState(initialName || '')
    const [description, setDescription] = useState(initialDescription || '')
    const [images, setImages] = useState(initialImages || [])
    const [price, setPrice] = useState(initialPrice || '')
    const [goTOProducts, setGoToProducts] = useState(false)
    const router = useRouter()

    async function saveProduct(e) {
        e.preventDefault()
        const data = { name, description, price, images }
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

    async function uploadImages(e) {
        const files = e.target?.files
        if (!files?.length) return
        if (files?.length > 0) {
            const data = new FormData()
            for (const file of files) {
                data.append('images', file)
            }
            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })
        }
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

            <label>Images</label>
            <div className="my-2 flex flex-wrap gap-2 items-center">
                {images?.map(link => (
                    <div key={link} className="h-24">
                        <img src={link} alt={link} className="rounded-lg" />
                    </div>
                ))}
                <label className="w-24 h-24 outline outline-gray-200 transition-all duration-500 hover:bg-gray-200 flex flex-col justify-center items-center rounded-lg cursor-pointer">
                    <FiUpload size={34} color="grey" />
                    <input type="file" className="hidden" onChange={uploadImages} />
                </label>
            </div>

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