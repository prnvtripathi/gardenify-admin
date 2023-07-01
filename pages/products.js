"use client"

import Layout from "@/components/Layout"
import Link from 'next/link'
import { useEffect, useState } from "react"
import axios from "axios"
import { FaPen, FaTrash } from "react-icons/fa"

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data)
        })
    }, [])

    return (
        <Layout>
            <Link href={'/products/new'} className='btn-primary'>
                Add new Products
            </Link>
            <table className="basic">
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>
                                <Link className="default" href={`/products/edit/${product._id}`}>
                                    <button className="flex gap-1 items-center">
                                        <FaPen size={16} />Edit
                                    </button>
                                </Link>
                                <Link className="red" href={`/products/delete/${product._id}`}>
                                    <button className="flex gap-1 items-center">
                                        <FaTrash size={16} />Delete
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default Products