import { useEffect, type ReactNode } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface NavDrawerProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly title: string
  readonly className?: string
  readonly closeClassName?: string
  readonly children: ReactNode
}

export function NavDrawer({
  open,
  onOpenChange,
  title,
  className,
  closeClassName,
  children,
}: NavDrawerProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const media = window.matchMedia('(min-width: 1024px)')
    const handleChange = () => {
      if (media.matches) {
        onOpenChange(false)
      }
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [open, onOpenChange])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={cn('px-6 py-7', className)} closeClassName={closeClassName}>
        <SheetTitle className="sr-only">{title}</SheetTitle>
        <SheetDescription className="sr-only">Restaurant CRM navigation</SheetDescription>
        {children}
      </SheetContent>
    </Sheet>
  )
}
