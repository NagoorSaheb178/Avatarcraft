import { Suspense } from "react"
import AvatarDashboard from "@/components/avatar-dashboard"
import DashboardSkeleton from "@/components/dashboard-skeleton"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<DashboardSkeleton />}>
        <AvatarDashboard />
      </Suspense>
    </main>
  )
}
