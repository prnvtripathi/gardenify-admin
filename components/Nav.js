"use client"

import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineShop } from 'react-icons/ai'
import { MdOutlineSpaceDashboard, MdOutlineSettings, MdOutlineCategory, MdOutlineLogout } from 'react-icons/md'
import { IoFileTrayFullOutline, IoClipboardOutline } from 'react-icons/io5'
import { signOut } from 'next-auth/react'

const Nav = ({ show }) => {
    const inactiveLink = 'flex gap-3 hover:outline-highlight hover:outline p-2 rounded-sm transition-all transition-800'
    const activeLink = inactiveLink + ' bg-highlight text-primary'
    const router = useRouter()
    const { pathname } = router

    return (
        <aside className={(show ? '-left-0' : '-left-full') + ' top-0 text-white p-4 fixed w-auto h-full bg-bg md:static md:w-auto transition-all'}>
            <div className='my-4 text-highlight'>
                <Link href="/" className='flex items-center'>
                    <AiOutlineShop size={32} />
                    <span className='text-xl font-sans mx-3'>Iapple Admin</span>
                </Link>
            </div>
            <nav>
                <ul className='flex flex-col gap-4'>
                    <li><Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}><MdOutlineSpaceDashboard className='text-iconGreen' size={24} />Dashboard</Link></li>
                    <li><Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}><IoFileTrayFullOutline className='text-iconGreen' size={24} />Products</Link></li>
                    <li><Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}><MdOutlineCategory className='text-iconGreen' size={24} />Categories</Link></li>
                    <li><Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}><IoClipboardOutline className='text-iconGreen' size={24} />Orders</Link></li>
                    <li><Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}><MdOutlineSettings className='text-iconGreen' size={24} />Settings</Link></li>
                    <li><button
                        onClick={() => signOut()}
                        className="flex gap-1 justify-center items-center p-2 hover:bg-highlight hover:text-gray-800 transition duration-300 rounded-lg">
                        <MdOutlineLogout className='text-iconGreen' size={24} />Logout
                    </button></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Nav  