import { useId, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAddEmployeeBonus } from '../api'
import type { Employee } from '../types/employee'

interface EmployeeBonusDialogProps {
  readonly employee: Employee | null
  readonly onOpenChange: (open: boolean) => void
}

export function EmployeeBonusDialog({ employee, onOpenChange }: EmployeeBonusDialogProps) {
  const amountInputId = useId()
  const [amount, setAmount] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const addBonus = useAddEmployeeBonus()

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setAmount('')
      setValidationError(null)
      addBonus.reset()
    }
    onOpenChange(nextOpen)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!employee) {
      return
    }

    const parsedAmount = Number(amount)
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setValidationError('Enter an amount greater than zero.')
      return
    }

    setValidationError(null)
    addBonus.mutate(
      { employeeId: employee.id, amount: parsedAmount },
      { onSuccess: () => handleOpenChange(false) },
    )
  }

  return (
    <Dialog open={employee !== null} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add bonus</DialogTitle>
          <DialogDescription>
            {employee ? `Add a bonus to ${employee.name}.` : 'Add a bonus to the employee.'}
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor={amountInputId} className="text-xs font-medium text-neutral-700">
              Bonus amount
            </label>
            <Input
              id={amountInputId}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              required
              autoFocus
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value)
                setValidationError(null)
              }}
              placeholder="0"
              aria-invalid={validationError !== null}
              aria-describedby={validationError ? `${amountInputId}-error` : undefined}
            />
            {validationError && (
              <p id={`${amountInputId}-error`} role="alert" className="text-xs text-destructive">
                {validationError}
              </p>
            )}
            {addBonus.isError && (
              <p role="alert" className="text-xs text-destructive">
                Could not add the bonus. Please try again.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={addBonus.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={addBonus.isPending}>
              {addBonus.isPending ? 'Adding…' : 'Add bonus'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
