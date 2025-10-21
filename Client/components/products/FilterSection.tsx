import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FilterSectionProps {
  title: string
  sectionKey: string
  options?: string[]   // make it optional
  selectedOptions?: string[]
  onOptionToggle: (option: string) => void
  isExpanded: boolean
  onToggleExpand: () => void
}

export const FilterSection = ({
  title,
  sectionKey,
  options = [],           // default fallback
  selectedOptions = [],   // default fallback
  onOptionToggle,
  isExpanded,
  onToggleExpand
}: FilterSectionProps) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggleExpand}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <h3 className="font-medium">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {isExpanded && options.length > 0 && (
        <div className="px-4 pb-4 space-y-3">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${sectionKey}-${option}`}
                checked={selectedOptions.includes(option)}
                onCheckedChange={() => onOptionToggle(option)}
              />
              <label 
                htmlFor={`${sectionKey}-${option}`} 
                className="text-sm cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
