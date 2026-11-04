import type { ComponentProps } from 'react'
import { X } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

function Sheet(props: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

interface SheetContentProps extends ComponentProps<typeof DialogPrimitive.Content> {
  readonly closeClassName?: string
}

function SheetContent({
  className,
  children,
  closeClassName,
  ...props
}: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="sheet-overlay"
        className="fixed inset-0 z-50 bg-black/40 duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
      />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col bg-background shadow-xl duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:animate-in data-[state=open]:slide-in-from-left',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className={cn(
            'absolute top-4 right-3 flex size-11 cursor-pointer items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
            closeClassName,
          )}
        >
          <X aria-hidden="true" className="size-5" />
          <span className="sr-only">Close menu</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

function SheetTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="sheet-title" className={className} {...props} />
}

function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={className}
      {...props}
    />
  )
}

export { Sheet, SheetContent, SheetDescription, SheetTitle }
