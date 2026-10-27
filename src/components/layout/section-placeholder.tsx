import { Construction } from 'lucide-react'

export function SectionPlaceholder() {
  return (
    <section
      aria-label="Section placeholder"
      className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-muted/40 p-12 text-center"
    >
      <Construction aria-hidden="true" className="size-6 text-neutral-400" strokeWidth={1.6} />
      <p className="mt-3 text-sm font-medium text-neutral-700">This section is under construction</p>
      <p className="mt-1 text-xs text-neutral-500">The mockup for this screen is not ready yet.</p>
    </section>
  )
}
