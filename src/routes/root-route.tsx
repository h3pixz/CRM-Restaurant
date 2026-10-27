import { createRootRoute } from '@tanstack/react-router'
import { AppLayout } from '@/components/layout/app-layout'

export const rootRoute = createRootRoute({ component: AppLayout })
