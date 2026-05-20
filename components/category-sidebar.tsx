'use client'

import { categories } from '@/lib/mock-data'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { 
  Box, 
  ImageIcon, 
  LayoutTemplate, 
  Wrench, 
  Music2, 
  Sparkles, 
  BrainCircuit, 
  PlayCircle,
  LayoutGrid
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  cube: <Box className="size-4" />,
  image: <ImageIcon className="size-4" />,
  layout: <LayoutTemplate className="size-4" />,
  wrench: <Wrench className="size-4" />,
  music: <Music2 className="size-4" />,
  sparkles: <Sparkles className="size-4" />,
  brain: <BrainCircuit className="size-4" />,
  play: <PlayCircle className="size-4" />,
}

export function CategorySidebar() {
  const { selectedCategory, setSelectedCategory, setSelectedAssetSlug } = useStore()

  const handleCategoryClick = (categoryName: string | null) => {
    setSelectedCategory(categoryName)
    setSelectedAssetSlug(null)
  }

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Categories</h3>
        <nav className="flex flex-col gap-1">
          <button
            onClick={() => handleCategoryClick(null)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-left',
              selectedCategory === null
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
            )}
          >
            <LayoutGrid className="size-4" />
            <span>All Categories</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className={cn(
                'flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-left',
                selectedCategory === category.name
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              )}
            >
              <div className="flex items-center gap-3">
                {iconMap[category.icon]}
                <span>{category.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{category.count.toLocaleString()}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
