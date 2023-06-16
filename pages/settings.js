import Layout from '@/components/Layout'
import { signOut } from 'next-auth/react'

const Settings = () => {
    return (
        <Layout>
            Settings
            <div className='my-2'>
                <button className='bg-teal-800 text-white px-2 py-1 rounded-sm transition-all transition-800 hover:rounded-xl' onClick={() => signOut()}>Log Out</button>
            </div>
        </Layout>
    )
}

export default Settings