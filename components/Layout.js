"use client"

import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import { MdMenu } from "react-icons/md"
import { useState } from "react"
import Link from "next/link"
import { AiOutlineShop } from "react-icons/ai"

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(false)

  const { data: session } = useSession()
  if (session) {
    return (
      <div className="bg-bg min-h-screen">
        <div className=" text-white md:hidden flex items-center p-4">
          <button onClick={() => setShowNav(true)}><MdMenu /></button>
          <div className='my-4 text-highlight flex grow justify-center'>
            <Link href="/" className='flex items-center'>
              <AiOutlineShop size={22} />
              <span className='text-md font-sans mr-2'>Gardenify Admin</span>
            </Link>
          </div>
        </div>
        <div className="min-h-screen flex">
          <Nav show={showNav} />
          <div className="flex-grow my-2 mr-2 bg-white rounded-lg p-4">
            <h2 className="my-2 p-2 text-black text-lg">{children}</h2>
          </div>
        </div>
      </div>

    )
  } else {
    return (
      <div className="bg-bg w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <button className="bg-white p-2 rounded-none transition-all transition-800 hover:rounded-xl" onClick={() => signIn()}>Login with Google</button>
        </div>
      </div>
    )
  }
}

export default Layout