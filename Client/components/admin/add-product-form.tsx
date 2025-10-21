"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type AddProductFormProps = {
  action: (formData: FormData) => Promise<void | { success?: boolean; error?: string }>
}

const DEFAULT_CATEGORIES = ["Dresses", "Suits", "Handbags", "Accessories", "Shoes"]
const BRANDS = ["Chanel", "Gucci", "Prada", "Dior", "Saint Laurent", "Other"]
const CONDITIONS = ["New", "Like New", "Gently Used"]
const SIZES = ["XS", "S", "M", "L", "XL"]
const COLORS = ["Black", "White", "Beige", "Gold", "Silver", "Navy"]

export function AddProductForm({ action }: AddProductFormProps) {
  const [sizes, setSizes] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("admin_categories")
      if (raw) {
        const arr = JSON.parse(raw) as string[]
        if (Array.isArray(arr) && arr.length) setCategories(arr)
      }
    } catch {}
  }, [])

  const previews = useMemo(() => images.map((file) => URL.createObjectURL(file)), [images])

  function toggleSize(size: string) {
    setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setImages(files.slice(0, 6)) // limit previews
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground text-pretty">Add Product</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center rounded-md border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
          >
            Cancel
          </Link>
          {/* Submit button couples with form via form attribute */}
          <button
            type="submit"
            form="add-product-form"
            className={cn(
              "inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
              "bg-black text-white hover:bg-gray-800",
            )}
            disabled={pending}
          >
            {pending ? "Saving..." : "Save Product"}
          </button>
        </div>
      </header>

      <form
        id="add-product-form"
        action={async (formData) => {
          setPending(true)
          setMessage(null)
          // persist sizes and basic image names to the form
          formData.set("sizes", sizes.join(","))
          if (images.length) {
            formData.set("imageNames", images.map((f) => f.name).join(","))
          }
          try {
            const res = await action(formData)
            if ((res as any)?.error) {
              setMessage((res as any).error)
            } else {
              setMessage("Product saved successfully.")
            }
          } catch (err: any) {
            setMessage(err?.message || "Something went wrong.")
          } finally {
            setPending(false)
          }
        }}
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        {/* Left: basic details */}
        <section className="md:col-span-2 grid grid-cols-1 gap-6">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              required
              placeholder="Ex: Black Silk Evening Gown"
              className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              placeholder="Describe fabric, fit, and styling notes..."
              className="rounded-md border border-gray-300 bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
                defaultValue={categories[0]}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="brand" className="text-sm font-medium">
                Brand
              </label>
              <select
                id="brand"
                name="brand"
                className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
                defaultValue={BRANDS[0]}
              >
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <label htmlFor="sku" className="text-sm font-medium">
                SKU
              </label>
              <input
                id="sku"
                name="sku"
                placeholder="SKU-12345"
                className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="price" className="text-sm font-medium">
                Full Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="rentalPrice" className="text-sm font-medium">
                Rental / day ($)
              </label>
              <input
                id="rentalPrice"
                name="rentalPrice"
                type="number"
                step="0.01"
                min="0"
                required
                className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <label htmlFor="stock" className="text-sm font-medium">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                defaultValue={1}
                className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="condition" className="text-sm font-medium">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
                defaultValue={CONDITIONS[0]}
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="material" className="text-sm font-medium">
                Material
              </label>
              <input
                id="material"
                name="material"
                placeholder="Silk, Wool, Leather..."
                className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <span className="text-sm font-medium">Sizes</span>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => {
                  const active = sizes.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSize(s)}
                      className={cn(
                        "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                        active ? "bg-black text-white border-black" : "border-gray-300 hover:bg-gray-100",
                      )}
                      aria-pressed={active}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="color" className="text-sm font-medium">
                Primary Color
              </label>
              <select
                id="color"
                name="color"
                className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
                defaultValue={COLORS[0]}
              >
                {COLORS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                placeholder="evening, black-tie, minimalist"
                className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-xs text-muted-foreground">Comma-separated. Example: evening, black-tie, minimalist</p>
            </div>
          </div>
        </section>

        {/* Right: images and status */}
        <aside className="md:col-span-1 grid gap-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Images</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={onFilesChange}
              className="h-10 rounded-md border border-gray-300 bg-background file:mr-3 file:rounded-md file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-gray-800"
            />
            {!!previews.length && (
              <div className="grid grid-cols-3 gap-2">
                {previews.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src || "/placeholder.svg"}
                    alt={`Preview ${i + 1}`}
                    className="h-20 w-full rounded-md object-cover ring-1 ring-gray-200"
                  />
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">Upload up to 6 images. Actual upload can be wired later.</p>
          </div>

          <div className="grid gap-2">
            <label htmlFor="available" className="text-sm font-medium">
              Availability
            </label>
            <select
              id="available"
              name="available"
              defaultValue="available"
              className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="featured" className="text-sm font-medium">
              Featured
            </label>
            <select
              id="featured"
              name="featured"
              defaultValue="no"
              className="h-10 rounded-md border border-gray-300 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-black"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {message && (
            <div
              role="status"
              className={cn(
                "rounded-md border px-3 py-2 text-sm",
                message.toLowerCase().includes("success") ? "border-gray-300" : "border-red-300",
              )}
            >
              {message}
            </div>
          )}
        </aside>
      </form>
    </div>
  )
}

export default AddProductForm
