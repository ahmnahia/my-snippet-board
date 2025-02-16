import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 text-center ">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}