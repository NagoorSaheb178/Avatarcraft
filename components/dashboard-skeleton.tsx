import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-10 w-64 rounded-md" />
          <Skeleton className="mt-2 h-5 w-48 rounded-md" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* Section title skeleton */}
      <div className="mt-8">
        <Skeleton className="h-8 w-48 rounded-md" />
      </div>

      {/* Avatar cards skeleton */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden rounded-lg border shadow">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="mt-2 h-4 w-48 rounded-md" />
            </div>
            <div className="border-t bg-gray-50 p-4 dark:bg-gray-800">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Floating button skeleton */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8">
        <Skeleton className="h-12 w-48 rounded-full" />
      </div>
    </div>
  )
}
