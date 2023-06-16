import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"


const Layout = ({ children }) => {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="bg-teal-800 min-h-screen flex">
        <Nav />
        <div className="flex-grow my-2 mr-2 bg-white rounded-lg p-4">
          <h2 className="my-2 p-2 text-black text-lg">{children}</h2>
        </div>
      </div>
    )
  } else {
    return (
      <div className="bg-teal-800 w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <button className="bg-white p-2 rounded-none transition-all transition-800 hover:rounded-xl" onClick={() => signIn()}>Login with Google</button>
        </div>
      </div>
    )
  }
}

export default Layout