import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useTableOrderQuery, useTableQuery } from '../api'
import { TableOrderDetails } from './table-order-details'
import {
  TableOrderEmpty,
  TableOrderError,
  TableOrderLoading,
  TableOrderNotFound,
} from './table-order-feedback'

export function TableOrderPage() {
  const { tableId } = useParams({ from: '/_admin/tables/$tableId' })
  const tableQuery = useTableQuery(tableId)
  const orderQuery = useTableOrderQuery(tableId)

  const isLoading = tableQuery.isPending || orderQuery.isPending
  const isError = tableQuery.isError || orderQuery.isError
  const error = tableQuery.error ?? orderQuery.error

  const heading = tableQuery.data ? `Table ${tableQuery.data.label}` : `Table ${tableId}`

  const handleRetry = () => {
    void tableQuery.refetch()
    void orderQuery.refetch()
  }

  return (
    <>
      <div className="mb-5 flex items-start gap-4">
        <Link
          to="/tables"
          aria-label="Back to tables"
          className="-ml-2 flex size-11 shrink-0 items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-200/60 hover:text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={2} />
        </Link>

        <div>
          <h3 className="text-2xl font-bold tracking-tight text-neutral-950">{heading}</h3>
          <p className="mt-0.5 text-xs font-medium text-neutral-500">Order details</p>
        </div>
      </div>

      {isLoading && <TableOrderLoading />}

      {isError && (
        <TableOrderError
          message={
            error instanceof Error
              ? error.message
              : 'Unexpected error while loading the order.'
          }
          onRetry={handleRetry}
        />
      )}

      {!isLoading && !isError && tableQuery.data === null && <TableOrderNotFound />}

      {!isLoading && !isError && tableQuery.data && (
        orderQuery.data ? (
          <TableOrderDetails key={orderQuery.data.tableId} order={orderQuery.data} />
        ) : (
          <TableOrderEmpty />
        )
      )}
    </>
  )
}
