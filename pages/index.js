import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  if (!session) return;
  return (
    <Layout>
      <div className="text-teal-900">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-lg">Welcome back, {session.user.name}!</p>
      </div>
    </Layout>
  )
}
