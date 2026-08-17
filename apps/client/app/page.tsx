"use client"

import { Dashboard } from "@/components/modules/Dashboard"

export default function Page() {
  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="mb-6 flex flex-col">
          <h1 className="text-2xl font-semibold">Simple Fitness Tracker</h1>
          <p className="text-sm text-muted-foreground">
            Overview of today&apos;s health goals
          </p>
        </div>

        <Dashboard />
      </div>
    </div>
  )
}
