import { CircleX, MessageSquare, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/format-currency'
import type { OrderItem } from '../types/order'

interface TableOrderItemProps {
  readonly item: OrderItem
  readonly isSelected: boolean
  readonly onToggleSelected: (itemId: string) => void
  readonly onChangeQuantity: (itemId: string, delta: number) => void
  readonly onRemove: (itemId: string) => void
}

function ItemDetails({ item, showPrice }: { readonly item: OrderItem; readonly showPrice: boolean }) {
  return (
    <>
      <p className="truncate text-sm font-medium text-neutral-800">{item.name}</p>
      {showPrice && (
        <p className="text-[11px] text-neutral-500">{formatCurrency(item.price)}</p>
      )}
      {item.note && <p className="truncate text-[11px] text-neutral-400">{item.note}</p>}
    </>
  )
}

interface QuantityStepperProps {
  readonly item: OrderItem
  readonly onChangeQuantity: (itemId: string, delta: number) => void
  readonly mobile: boolean
}

function QuantityStepper({ item, onChangeQuantity, mobile }: QuantityStepperProps) {
  const sizeClass = mobile ? 'size-11' : 'size-6'

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="secondary"
        size="icon-xs"
        aria-label={`Decrease quantity of ${item.name}`}
        disabled={item.quantity <= 1}
        onClick={() => onChangeQuantity(item.id, -1)}
        className={`${sizeClass} rounded-full bg-neutral-200/80 text-neutral-600 hover:bg-neutral-300`}
      >
        <Minus aria-hidden="true" className={mobile ? 'size-4' : 'size-3'} strokeWidth={2.5} />
      </Button>

      <span className="w-5 text-center text-xs font-semibold text-neutral-800">
        {item.quantity}
      </span>

      <Button
        type="button"
        variant="secondary"
        size="icon-xs"
        aria-label={`Increase quantity of ${item.name}`}
        onClick={() => onChangeQuantity(item.id, 1)}
        className={`${sizeClass} rounded-full bg-neutral-200/80 text-neutral-600 hover:bg-neutral-300`}
      >
        <Plus aria-hidden="true" className={mobile ? 'size-4' : 'size-3'} strokeWidth={2.5} />
      </Button>
    </div>
  )
}

export function TableOrderItem({
  item,
  isSelected,
  onToggleSelected,
  onChangeQuantity,
  onRemove,
}: TableOrderItemProps) {
  return (
    <>
      <div className="rounded-xl px-3 py-3 transition-colors hover:bg-neutral-100/60 md:hidden">
        <div className="flex items-start gap-3">
          <label className="-m-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelected(item.id)}
              aria-label={`Select ${item.name}`}
              className="size-5 cursor-pointer rounded accent-neutral-900"
            />
          </label>

          <div className="min-w-0 flex-1">
            <ItemDetails item={item} showPrice />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Remove ${item.name} from order`}
            onClick={() => onRemove(item.id)}
            className="-m-1 size-11 shrink-0 text-neutral-500 hover:text-destructive"
          >
            <CircleX aria-hidden="true" className="size-5" strokeWidth={1.6} />
          </Button>
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          <QuantityStepper item={item} onChangeQuantity={onChangeQuantity} mobile />
          <span className="text-sm font-semibold text-neutral-800">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      </div>

      <div className="hidden grid-cols-12 items-center gap-0 rounded-xl px-3 py-2 transition-colors hover:bg-neutral-100/60 md:grid">
        <div className="flex items-center md:col-span-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelected(item.id)}
            aria-label={`Select ${item.name}`}
            className="size-4 cursor-pointer rounded accent-neutral-900"
          />
        </div>

        <div className="min-w-0 md:col-span-5">
          <ItemDetails item={item} showPrice={false} />
        </div>

        <div className="hidden text-sm font-medium text-neutral-800 md:col-span-2 md:block">
          {formatCurrency(item.price)}
        </div>

        <div className="flex items-center justify-end gap-3 md:col-span-4 md:justify-between">
          <QuantityStepper item={item} onChangeQuantity={onChangeQuantity} mobile={false} />

          <div className="flex items-center gap-3 text-neutral-500">
            <MessageSquare aria-hidden="true" className="size-4" strokeWidth={1.8} />
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Remove ${item.name} from order`}
              onClick={() => onRemove(item.id)}
              className="text-neutral-500 hover:text-destructive"
            >
              <CircleX aria-hidden="true" className="size-4" strokeWidth={1.6} />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
