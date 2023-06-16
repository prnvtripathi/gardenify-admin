import Layout from "@/components/Layout"
import Link from 'next/link'

const Products = () => {
    return (
        <Layout>
            <Link href={'/products/new'} className='btn-primary'>
                Add new Products
            </Link>
        </Layout>
    )
}

export default Products