"use client"

import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

const DeleteProductPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [productInfo, setProductInfo] = useState()

    useEffect(() => {
        axios.get('/api/products?id=' + id).then(response => {
            setProductInfo(response.data)
        })
    }, [id])

    function goBack() {
        router.push('/products')
    }

    async function deleteProduct() {
        await axios.delete('/api/products?id=' + id)
        goBack()
    }

    return (
        <Layout>
            <h1 className='text-center'>Do you really want to delete "{productInfo?.name}"?</h1>
            <div className="flex gap-1 justify-center items-center">
                <button className="red" onClick={deleteProduct}>Yes</button>
                <button className="default" onClick={goBack}>No</button>
            </div>

        </Layout>
    )
}

export default DeleteProductPage