import Head from 'next/head'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Orders = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrders(response.data)
        })
    }, [])

    return (
        <>
            <Head>
                <title>Orders</title>
            </Head>
            <Layout>
                <h1>Orders</h1>
                <table className='basic'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Recipient</th>
                            <th>Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 && orders.map(order => (
                            <tr>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td>
                                    {order.name} {order.email} {order.phone}<br />
                                    {order.street}<br />
                                    {order.locality}<br />
                                    {order.city} {order.state} {order.country} {order.pincode}
                                </td>
                                <td>
                                    {order.line_items.map(l => (
                                        <div>
                                            {l.price_data?.product_data?.name} x {l.quantity}<br />
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Layout>
        </>

    )
}

export default Orders