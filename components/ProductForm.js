"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { FiUpload } from "react-icons/fi"
import Loader from "@/components/Loader"
import { ReactSortable } from "react-sortablejs"

const ProductForm = ({
    _id,
    name: initialName,
    description: initialDescription,
    price: initialPrice,
    category: initialCategory,
    images: initialImages,
    properties: initialProperties
}) => {
    const [name, setName] = useState(initialName || '')
    const [description, setDescription] = useState(initialDescription || '')
    const [category, setCategory] = useState(initialCategory || '')
    const [productProperties, setProductProperties] = useState({} || initialProperties)
    const [images, setImages] = useState(initialImages || [])
    const [price, setPrice] = useState(initialPrice || '')
    const [isUploading, setIsUploading] = useState(false)
    const [goTOProducts, setGoToProducts] = useState(false)
    const [categories, setCategories] = useState([])
    const router = useRouter()

    useEffect(() => {
        axios.get('/api/categories').then(res => {
            setCategories(res.data)
        })
    }, [])

    async function saveProduct(e) {
        e.preventDefault()
        const data = { name, description, price, images, category, properties: productProperties }
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
            setIsUploading(true)
            const data = new FormData()
            for (const file of files) {
                data.append('images', file)
            }
            const res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })
            setIsUploading(false)
        }
    }

    function updateImagesOrder(images) {
        setImages(images)
    }

    const propertiesToFill = []
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category)
        propertiesToFill.push(...catInfo.properties)
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id)
            propertiesToFill.push(...parentCat.properties)
            catInfo = parentCat
        }
    }

    function setProductProp(name, value) {
        setProductProperties(prev => {
            const newProps = { ...prev }
            newProps[name] = value
            return newProps
        })
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

            <label>Category</label>
            <select
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                <option value=''>Uncategorised</option>
                {categories?.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>

            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                <div className="flex gap-1 w-fit justify-between items-center">
                    <div>
                        {p.name}
                    </div>
                    <select
                        value={productProperties[p.name]}
                        onChange={(ev) => setProductProp(p.name, ev.target.value)} >
                        <option value=''>Select</option>
                        {p.values.map(v => (
                            <option value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            ))}

            <label>Images</label>
            <div className="my-2 flex flex-wrap gap-2 items-center">
                <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap items-center justify-center gap-2">
                    {images?.map(link => (
                        <div key={link} className="h-24">
                            <img src={link} alt={link} className="rounded-lg" />
                        </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                    <div className="w-24 h-24 flex justify-center items-center bg-gray-200 rounded-lg">
                        <Loader />
                    </div>
                )}
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