"use client"

import Layout from "@/components/Layout"
import Link from 'next/link'
import { useEffect, useState } from "react"
import axios from "axios"
import { FaPen, FaTrash } from "react-icons/fa"
import Loader from "@/components/Loader"
import Head from "next/head"

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);


    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <Layout>
                <Link href={'/products/new'} className='btn-primary'>
                    Add new Products
                </Link>
                <table className="basic">
                    {loading && <Loader />}
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
        </>
    )
}

export default Products