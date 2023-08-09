import Layout from '@/components/Layout'
import { signOut } from 'next-auth/react'
import Head from 'next/head'
import { MdOutlineLogout } from 'react-icons/md'

const Settings = () => {
    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>
            <Layout>
                Settings
                <div className='my-2'>
                    <button className=' flex gap-1 justify-center items-center bg-teal-800 text-white px-2 py-1 rounded-sm transition-all transition-800 hover:rounded-xl' onClick={() => signOut()}>
                        <MdOutlineLogout /> Logout
                    </button>
                </div>
            </Layout>
        </>
    )
}

export default Settings