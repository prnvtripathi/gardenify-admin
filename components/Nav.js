"use client"

import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineShop } from 'react-icons/ai'
import { MdOutlineSpaceDashboard, MdOutlineSettings } from 'react-icons/md'
import { IoFileTrayFullOutline, IoClipboardOutline } from 'react-icons/io5'

const Nav = () => {
    const inactiveLink = 'flex gap-1 hover:outline-white hover:outline p-2 rounded-l-lg transition-all transition-800'
    const activeLink = inactiveLink + ' bg-white text-teal-800'
    const router = useRouter()
    const { pathname } = router

    return (
        <aside className='text-white p-4 pr-0'>
            <div className='my-4'>
                <Link href="/" className='flex items-center'>
                    <AiOutlineShop size={32} />
                    <span className='text-xl font-sans mx-3'>Gardenify Admin</span>
                </Link>
            </div>
            <nav>
                <ul className='flex flex-col gap-4'>
                    <li><Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}><MdOutlineSpaceDashboard size={24} />Dashboard</Link></li>
                    <li><Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}><IoFileTrayFullOutline size={24} />Products</Link></li>
                    <li><Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}><IoClipboardOutline size={24} />Orders</Link></li>
                    <li><Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}><MdOutlineSettings size={24} />Settings</Link></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Nav  