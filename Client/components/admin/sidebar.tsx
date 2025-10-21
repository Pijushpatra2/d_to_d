"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/rentals", label: "Rentals" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/brands", label: "Brands" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [lowCount, setLowCount] = useState(0)

  useEffect(() => {
    const refresh = () => {
      try {
        const c = Number(localStorage.getItem("lowStockCount") || "0")
        setLowCount(Number.isFinite(c) ? c : 0)
      } catch {}
    }
    refresh()
    const onCustom = () => refresh()
    window.addEventListener("lowStockUpdated", onCustom as EventListener)
    window.addEventListener("storage", onCustom)
    return () => {
      window.removeEventListener("lowStockUpdated", onCustom as EventListener)
      window.removeEventListener("storage", onCustom)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    router.replace("/login")
  }

  const Nav = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex flex-col gap-2">
      {links.map((l) => {
        const active = pathname === l.href
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClick}
            className={cn(
              "rounded-md px-3 py-2 text-sm transition-colors",
              "text-black hover:bg-black hover:text-white",
              active && "bg-black text-white",
              "flex items-center justify-between",
            )}
            aria-current={active ? "page" : undefined}
          >
            <span>{l.label}</span>
            {l.href === "/admin/products" && lowCount > 0 && (
              <span className="ml-3 inline-flex min-w-6 items-center justify-center rounded-full bg-black px-2 py-0.5 text-xs text-white">
                {lowCount}
              </span>
            )}
          </Link>
        )
      })}
      {/* Logout Button */}
      <Button
        variant="ghost"
        onClick={() => {
          onClick?.()
          handleLogout()
        }}
        className="mt-4 flex items-center justify-start gap-2 text-red-600 hover:bg-red-100"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </nav>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 md:hidden">
        <div className="font-semibold">Admin</div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="text-black hover:bg-black hover:text-white"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-white p-4">
            <div className="mb-4 text-lg font-semibold">Menu</div>
            <Nav onClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar (hidden on small screens) */}
      <aside className="hidden md:flex h-screen w-64 shrink-0 flex-col justify-between border-r border-gray-200 bg-white p-4">
        <div>
          <div className="mb-4 text-lg font-semibold">Admin</div>
          <Nav />
        </div>
      </aside>
    </>
  )
}
