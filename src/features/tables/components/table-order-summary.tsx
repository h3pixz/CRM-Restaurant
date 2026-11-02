import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/format-currency'

interface TableOrderSummaryProps {
  readonly total: number
}

export function TableOrderSummary({ total }: TableOrderSummaryProps) {
  return (
    <footer className="mt-8">
      <p className="mb-2 text-xs font-bold text-neutral-900">Total</p>

      <div className="flex flex-col gap-4 rounded-md border border-neutral-950 p-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-3xl font-semibold tracking-tight text-neutral-950">
          {formatCurrency(total)}
        </span>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled
            className="rounded-lg border-neutral-900 px-5 py-2.5 text-xs font-semibold tracking-wide text-neutral-900 hover:bg-neutral-100"
          >
            Discount
          </Button>
          <Button
            type="button"
            disabled
            className="rounded-lg bg-[#1E242C] px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm hover:bg-black"
          >
            Check Order
          </Button>
        </div>
      </div>
    </footer>
  )
}
