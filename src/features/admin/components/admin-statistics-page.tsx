import { AnalyticsPage } from '@/features/analytics'

export function AdminStatisticsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="mb-6 text-[28px] leading-tight font-bold text-neutral-900">Statistics</h2>
      <AnalyticsPage />
    </div>
  )
}
