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

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled
            className="h-11 rounded-lg border-neutral-900 px-5 text-xs font-semibold tracking-wide text-neutral-900 hover:bg-neutral-100 sm:h-9"
          >
            Discount
          </Button>
          <Button
            type="button"
            disabled
            className="h-11 rounded-lg bg-[#1E242C] px-5 text-xs font-semibold tracking-wide text-white shadow-sm hover:bg-black sm:h-9"
          >
            Check Order
          </Button>
        </div>
      </div>
    </footer>
  )
}
