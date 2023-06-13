import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="bg-teal-800 w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <button className="bg-white p-2 rounded-none transition-all transition-800 hover:rounded-xl">User Signed In as {session.user.email}</button>
          <button className="bg-white p-2 rounded-none transition-all transition-800 hover:rounded-xl" onClick={() => signOut()}>Sign Out</button>
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
