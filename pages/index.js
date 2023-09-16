import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
    <Head>
      <title>Home {session?.user?.name}</title>
    </Head>
      <Layout>
        <div className="text-teal-900 flex justify-between">
          <h2 className="text-lg">Hello, <strong>{session?.user?.name}!</strong></h2>
          <div className="flex gap-1 bg-gray-300 text-black items-center rounded-lg overflow-hidden px-1">
            <img src={session?.user?.image} alt={session?.user?.name} className="w-6 h-6 rounded-lg" />
            <p>{session?.user?.name}</p>
          </div>
        </div>
      </Layout>
    </>

  )
}
