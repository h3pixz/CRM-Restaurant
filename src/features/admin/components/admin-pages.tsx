import { SectionPlaceholder } from '@/components/layout/section-placeholder'

interface AdminSectionPageProps {
  readonly title: string
}

export function AdminSectionPage({ title }: AdminSectionPageProps) {
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="mb-6 text-[28px] leading-tight font-bold text-neutral-900">{title}</h2>
      <SectionPlaceholder />
    </div>
  )
}

export function AdminOrdersPage() {
  return <AdminSectionPage title="Orders" />
}

export function AdminStatisticsPage() {
  return <AdminSectionPage title="Statistics" />
}
