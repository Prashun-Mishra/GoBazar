interface ProductHighlightsProps {
  highlights: string[]
}

export function ProductHighlights({ highlights }: ProductHighlightsProps) {
  if (!highlights || highlights.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Highlights</h3>
      <div className="flex flex-wrap gap-2">
        {highlights.map((highlight, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            {highlight}
          </span>
        ))}
      </div>
    </div>
  )
}
