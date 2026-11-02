import { useCallback, useMemo, useState } from 'react'
import {
  ORDER_CATEGORIES,
  type OrderCategory,
  type OrderItem,
  type TableOrder,
} from '../types/order'
import { TableOrderItem } from './table-order-item'
import { TableOrderSummary } from './table-order-summary'

const CATEGORY_LABELS: Record<OrderCategory, string> = {
  appetizer: 'Appetizer',
  main: 'Main Course',
  drinks: 'Drinks',
  dessert: 'Dessert',
}

interface TableOrderDetailsProps {
  readonly order: TableOrder
}

export function TableOrderDetails({ order }: TableOrderDetailsProps) {
  const [items, setItems] = useState<readonly OrderItem[]>(order.items)
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(() => new Set())

  const handleToggleSelected = useCallback((itemId: string) => {
    setSelectedIds((current) => {
      const next = new Set(current)

      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }

      return next
    })
  }, [])

  const handleChangeQuantity = useCallback((itemId: string, delta: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    )
  }, [])

  const handleRemove = useCallback((itemId: string) => {
    setItems((current) => current.filter((item) => item.id !== itemId))
    setSelectedIds((current) => {
      if (!current.has(itemId)) {
        return current
      }

      const next = new Set(current)
      next.delete(itemId)
      return next
    })
  }, [])

  const groups = useMemo(
    () =>
      ORDER_CATEGORIES.map((category) => ({
        category,
        items: items.filter((item) => item.category === category),
      })).filter((group) => group.items.length > 0),
    [items],
  )

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  return (
    <>
      <div className="rounded-2xl border border-neutral-100 bg-card p-6 shadow-sm">
        <div className="mb-2 hidden grid-cols-12 items-center px-3 pb-3 text-xs font-medium text-neutral-400 md:grid">
          <span className="col-span-1" />
          <span className="col-span-5">Dish</span>
          <span className="col-span-2">Price</span>
          <span className="col-span-4">Amount</span>
        </div>

        {items.length === 0 ? (
          <p className="py-10 text-center text-sm text-neutral-500">
            No items in this order.
          </p>
        ) : (
          groups.map((group) => (
            <div key={group.category} className="mb-4 last:mb-0">
              <div className="flex items-center gap-2 px-3 py-1.5">
                <span
                  aria-hidden="true"
                  className="flex size-5 items-center justify-center rounded bg-[#2B2E35] text-xs font-semibold text-white"
                >
                  +
                </span>
                <span className="text-xs font-semibold tracking-wide text-neutral-400">
                  {CATEGORY_LABELS[group.category]}
                </span>
              </div>

              {group.items.map((item) => (
                <TableOrderItem
                  key={item.id}
                  item={item}
                  isSelected={selectedIds.has(item.id)}
                  onToggleSelected={handleToggleSelected}
                  onChangeQuantity={handleChangeQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          ))
        )}
      </div>

      <TableOrderSummary total={total} />
    </>
  )
}
