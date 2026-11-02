import { CircleX, MessageSquare, Minus, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

export function TableOrderItem({
  item,
  isSelected,
  onToggleSelected,
  onChangeQuantity,
  onRemove,
}: TableOrderItemProps) {
  return (
    <div className="grid grid-cols-[1.25rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-neutral-100/60 md:grid-cols-12 md:gap-0">
      <div className="flex items-center md:col-span-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelected(item.id)}
          aria-label={`Select ${item.name}`}
          className="size-4 cursor-pointer rounded accent-neutral-900"
        />
      </div>

      <div className="flex min-w-0 items-center gap-3 md:col-span-5">
        <Avatar className="size-9">
          <AvatarImage src={item.imageUrl} alt="" />
          <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-neutral-800">{item.name}</p>
          <p className="text-[11px] text-neutral-500 md:hidden">
            {formatCurrency(item.price)}
          </p>
          {item.note && (
            <p className="truncate text-[11px] text-neutral-400">{item.note}</p>
          )}
        </div>
      </div>

      <div className="hidden text-sm font-medium text-neutral-800 md:col-span-2 md:block">
        {formatCurrency(item.price)}
      </div>

      <div className="flex items-center justify-end gap-3 md:col-span-4 md:justify-between">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon-xs"
            aria-label={`Decrease quantity of ${item.name}`}
            disabled={item.quantity <= 1}
            onClick={() => onChangeQuantity(item.id, -1)}
            className="size-6 rounded-full bg-neutral-200/80 text-neutral-600 hover:bg-neutral-300"
          >
            <Minus aria-hidden="true" className="size-3" strokeWidth={2.5} />
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
            className="size-6 rounded-full bg-neutral-200/80 text-neutral-600 hover:bg-neutral-300"
          >
            <Plus aria-hidden="true" className="size-3" strokeWidth={2.5} />
          </Button>

          <span className="ml-2 w-14 text-right text-xs font-semibold text-neutral-800 md:hidden">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>

        <div className="flex items-center gap-3 text-neutral-500">
          <MessageSquare
            aria-hidden="true"
            className="hidden size-4 md:block"
            strokeWidth={1.8}
          />
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
  )
}
