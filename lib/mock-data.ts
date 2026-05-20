import { Asset, Category, Review, Publisher } from './types'

const publishers: Publisher[] = [
  { id: 'pub1', name: 'Unity Technologies', avatar: 'U', assetCount: 156, rating: 4.9 },
  { id: 'pub2', name: 'Synty Studios', avatar: 'S', assetCount: 89, rating: 4.8 },
  { id: 'pub3', name: 'TextMesh Pro', avatar: 'T', assetCount: 12, rating: 4.9 },
  { id: 'pub4', name: 'DOTween', avatar: 'D', assetCount: 8, rating: 4.7 },
  { id: 'pub5', name: 'Procedural Worlds', avatar: 'P', assetCount: 34, rating: 4.6 },
  { id: 'pub6', name: 'Amplify Creations', avatar: 'A', assetCount: 23, rating: 4.8 },
]

export const categories: Category[] = [
  { id: '1', name: '3D Models', slug: '3d', icon: 'cube', count: 2847 },
  { id: '2', name: '2D Assets', slug: '2d', icon: 'image', count: 1923 },
  { id: '3', name: 'Templates', slug: 'templates', icon: 'layout', count: 856 },
  { id: '4', name: 'Tools', slug: 'tools', icon: 'wrench', count: 1245 },
  { id: '5', name: 'Audio', slug: 'audio', icon: 'music', count: 634 },
  { id: '6', name: 'VFX', slug: 'vfx', icon: 'sparkles', count: 478 },
  { id: '7', name: 'AI', slug: 'ai', icon: 'brain', count: 234 },
  { id: '8', name: 'Animations', slug: 'animations', icon: 'play', count: 567 },
]

export const assets: Asset[] = [
  {
    id: '1',
    name: 'POLYGON - Fantasy Kingdom',
    slug: 'polygon-fantasy-kingdom',
    description: `Create stunning fantasy environments with this comprehensive low poly asset pack. Includes over 1,200 prefabs, characters, props, and environmental assets.\n\nPerfect for:\n- RPG games\n- Strategy games\n- Adventure games\n- Mobile games\n\nFeatures:\n- Modular building system\n- 50+ character models\n- Animated creatures\n- Complete UI kit\n- Demo scenes included`,
    shortDescription: 'Low poly fantasy asset pack with 1,200+ prefabs',
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviewCount: 1847,
    category: '3D Models',
    tags: ['low poly', 'fantasy', 'characters', 'environment'],
    publisher: publishers[1],
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    ],
    version: '1.8.2',
    unityVersion: '2021.3+',
    fileSize: '856 MB',
    releaseDate: '2022-03-15',
    lastUpdated: '2024-01-20',
    features: ['Modular Design', 'PBR Materials', 'LOD Support', 'Mobile Ready'],
    isFeatured: true,
    isOnSale: true,
  },
  {
    id: '2',
    name: 'DOTween Pro',
    slug: 'dotween-pro',
    description: `The most powerful and flexible animation engine for Unity. DOTween Pro gives you complete control over animations with an intuitive API and visual editor.\n\nKey Features:\n- Sequence system\n- Path animations\n- Visual timeline editor\n- Easing functions library\n- Performance optimized`,
    shortDescription: 'Fast, efficient animation engine for Unity',
    price: 15,
    rating: 4.9,
    reviewCount: 5623,
    category: 'Tools',
    tags: ['animation', 'tweening', 'scripting', 'editor'],
    publisher: publishers[3],
    images: [
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    ],
    version: '1.0.375',
    unityVersion: '2019.4+',
    fileSize: '12 MB',
    releaseDate: '2018-06-10',
    lastUpdated: '2024-02-15',
    features: ['Visual Editor', 'Path System', 'Callbacks', 'Documentation'],
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Amplify Shader Editor',
    slug: 'amplify-shader-editor',
    description: `Create stunning shaders visually without writing code. Amplify Shader Editor is a powerful node-based shader creation tool.\n\nIncludes:\n- 200+ shader functions\n- Templates for all render pipelines\n- Real-time preview\n- Extensive documentation`,
    shortDescription: 'Node-based shader creation tool',
    price: 80,
    originalPrice: 100,
    rating: 4.7,
    reviewCount: 2156,
    category: 'Tools',
    tags: ['shaders', 'graphics', 'visual', 'nodes'],
    publisher: publishers[5],
    images: [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    ],
    version: '1.9.3',
    unityVersion: '2020.3+',
    fileSize: '145 MB',
    releaseDate: '2019-08-22',
    lastUpdated: '2024-01-05',
    features: ['URP Support', 'HDRP Support', 'Custom Nodes', 'Templates'],
    isOnSale: true,
  },
  {
    id: '4',
    name: 'Odin Inspector',
    slug: 'odin-inspector',
    description: `Supercharge your Unity workflow with powerful inspector and serialization tools. Odin makes creating custom editors effortless.\n\nFeatures:\n- 100+ inspector attributes\n- Serialization system\n- Validation tools\n- Project utilities`,
    shortDescription: 'Powerful Unity editor extensions',
    price: 55,
    rating: 4.9,
    reviewCount: 3421,
    category: 'Tools',
    tags: ['editor', 'inspector', 'serialization', 'workflow'],
    publisher: publishers[0],
    images: [
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
    ],
    version: '3.2.1',
    unityVersion: '2020.3+',
    fileSize: '89 MB',
    releaseDate: '2020-01-15',
    lastUpdated: '2024-02-28',
    features: ['Custom Drawers', 'Validation', 'Serialization', 'Scene Tools'],
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Gaia Pro',
    slug: 'gaia-pro',
    description: `Create stunning terrains in minutes with Gaia Pro. This powerful terrain generation tool includes everything you need for beautiful environments.\n\nIncludes:\n- Procedural terrain generation\n- Biome system\n- Spawner system\n- Weather effects`,
    shortDescription: 'Procedural terrain generation system',
    price: 106,
    rating: 4.6,
    reviewCount: 1234,
    category: '3D Models',
    tags: ['terrain', 'procedural', 'environment', 'landscape'],
    publisher: publishers[4],
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    ],
    version: '4.0.2',
    unityVersion: '2021.3+',
    fileSize: '2.3 GB',
    releaseDate: '2021-05-10',
    lastUpdated: '2024-01-30',
    features: ['Biomes', 'Spawners', 'Weather', 'Lighting'],
  },
  {
    id: '6',
    name: 'Universal Sound FX',
    slug: 'universal-sound-fx',
    description: `Over 5,000 high-quality sound effects for your projects. Professionally recorded and edited for game development.\n\nCategories:\n- UI sounds\n- Weapons\n- Ambient\n- Creatures\n- Magic`,
    shortDescription: '5,000+ professional sound effects',
    price: 0,
    rating: 4.5,
    reviewCount: 892,
    category: 'Audio',
    tags: ['audio', 'sfx', 'sound effects', 'free'],
    publisher: publishers[0],
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop',
    ],
    version: '2.1.0',
    fileSize: '1.8 GB',
    releaseDate: '2022-09-01',
    lastUpdated: '2023-12-10',
    features: ['WAV Format', 'Categorized', 'Loop Ready', 'Documentation'],
  },
  {
    id: '7',
    name: 'POLYGON City Pack',
    slug: 'polygon-city-pack',
    description: `Build modern urban environments with this comprehensive city asset pack. Over 500 modular buildings, vehicles, and props.\n\nPerfect for:\n- Racing games\n- Open world games\n- Simulation games`,
    shortDescription: 'Low poly modern city assets',
    price: 39.99,
    rating: 4.7,
    reviewCount: 956,
    category: '3D Models',
    tags: ['low poly', 'city', 'urban', 'modular'],
    publisher: publishers[1],
    images: [
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    ],
    version: '1.5.0',
    unityVersion: '2020.3+',
    fileSize: '456 MB',
    releaseDate: '2022-06-20',
    lastUpdated: '2024-02-01',
    features: ['Modular', 'Vehicles', 'Props', 'Demo Scene'],
  },
  {
    id: '8',
    name: 'TextMesh Pro',
    slug: 'textmesh-pro',
    description: `The ultimate text solution for Unity. Create beautiful, high-quality text with advanced features and superior rendering.\n\nFeatures:\n- SDF rendering\n- Rich text support\n- Font asset creator\n- Text effects`,
    shortDescription: 'Advanced text rendering solution',
    price: 0,
    rating: 4.9,
    reviewCount: 8234,
    category: '2D Assets',
    tags: ['text', 'ui', 'fonts', 'free'],
    publisher: publishers[2],
    images: [
      'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&h=600&fit=crop',
    ],
    version: '3.2.0',
    unityVersion: '2019.4+',
    fileSize: '34 MB',
    releaseDate: '2018-01-01',
    lastUpdated: '2024-01-15',
    features: ['SDF Text', 'Rich Text', 'Sprites', 'Shaders'],
    isFeatured: true,
  },
  {
    id: '9',
    name: 'Particle FX Pack',
    slug: 'particle-fx-pack',
    description: `200+ stunning particle effects ready to use in your projects. Includes explosions, magic, weather, and environmental effects.\n\nAll effects are:\n- GPU optimized\n- Customizable\n- Mobile ready`,
    shortDescription: '200+ ready-to-use particle effects',
    price: 25,
    rating: 4.6,
    reviewCount: 567,
    category: 'VFX',
    tags: ['particles', 'effects', 'magic', 'explosions'],
    publisher: publishers[5],
    images: [
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&h=600&fit=crop',
    ],
    version: '2.0.1',
    unityVersion: '2020.3+',
    fileSize: '234 MB',
    releaseDate: '2023-02-14',
    lastUpdated: '2024-02-20',
    features: ['GPU Particles', 'Customizable', 'Mobile Ready', 'Prefabs'],
  },
  {
    id: '10',
    name: 'AI Navigation Pro',
    slug: 'ai-navigation-pro',
    description: `Advanced AI pathfinding and navigation system. Create intelligent NPCs with realistic movement and decision making.\n\nIncludes:\n- A* pathfinding\n- Behavior trees\n- Steering behaviors\n- Group navigation`,
    shortDescription: 'Advanced AI pathfinding system',
    price: 45,
    rating: 4.5,
    reviewCount: 423,
    category: 'AI',
    tags: ['ai', 'pathfinding', 'navigation', 'npc'],
    publisher: publishers[4],
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    ],
    version: '1.3.0',
    unityVersion: '2021.3+',
    fileSize: '67 MB',
    releaseDate: '2023-06-01',
    lastUpdated: '2024-01-25',
    features: ['A* Pathfinding', 'Behavior Trees', 'Steering', 'Groups'],
  },
  {
    id: '11',
    name: 'Animation Starter Pack',
    slug: 'animation-starter-pack',
    description: `Get started with character animation! This pack includes 100+ motion capture animations for humanoid characters.\n\nCategories:\n- Locomotion\n- Combat\n- Interactions\n- Emotes`,
    shortDescription: '100+ mocap animations for humanoids',
    price: 0,
    rating: 4.4,
    reviewCount: 2134,
    category: 'Animations',
    tags: ['animation', 'mocap', 'humanoid', 'free'],
    publisher: publishers[0],
    images: [
      'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&h=600&fit=crop',
    ],
    version: '1.0.0',
    fileSize: '456 MB',
    releaseDate: '2021-03-20',
    lastUpdated: '2023-08-15',
    features: ['Mecanim Ready', 'Root Motion', 'Loops', 'Transitions'],
  },
  {
    id: '12',
    name: 'Inventory Pro',
    slug: 'inventory-pro',
    description: `Complete inventory system with drag-and-drop UI, crafting, equipment slots, and save/load functionality.\n\nFeatures:\n- Modular design\n- Customizable UI\n- Database system\n- Full documentation`,
    shortDescription: 'Complete inventory and crafting system',
    price: 35,
    rating: 4.7,
    reviewCount: 789,
    category: 'Templates',
    tags: ['inventory', 'ui', 'rpg', 'crafting'],
    publisher: publishers[3],
    images: [
      'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&h=600&fit=crop',
    ],
    version: '2.5.0',
    unityVersion: '2020.3+',
    fileSize: '78 MB',
    releaseDate: '2022-11-10',
    lastUpdated: '2024-02-10',
    features: ['Drag & Drop', 'Crafting', 'Equipment', 'Save System'],
  },
]

export const reviews: Review[] = [
  {
    id: '1',
    assetId: '1',
    userId: 'u1',
    userName: 'GameDev_Mike',
    userAvatar: 'M',
    rating: 5,
    comment: 'Absolutely fantastic asset pack! The quality of the models is incredible and they work perfectly with my mobile game. The modular system makes level design a breeze.',
    date: '2024-02-15',
    helpful: 42,
  },
  {
    id: '2',
    assetId: '1',
    userId: 'u2',
    userName: 'IndieStudio',
    userAvatar: 'I',
    rating: 4,
    comment: 'Great value for the price. Some textures could be higher resolution but overall very happy with the purchase. Support team was helpful too.',
    date: '2024-01-28',
    helpful: 18,
  },
  {
    id: '3',
    assetId: '1',
    userId: 'u3',
    userName: 'UnityNewbie',
    userAvatar: 'U',
    rating: 5,
    comment: 'Perfect for beginners! Everything is well organized and the demo scenes helped me understand how to use the assets effectively.',
    date: '2024-02-01',
    helpful: 31,
  },
  {
    id: '4',
    assetId: '2',
    userId: 'u4',
    userName: 'ProAnimator',
    userAvatar: 'P',
    rating: 5,
    comment: 'DOTween is essential for any Unity project. The performance is incredible and the API is intuitive. Best animation tool out there.',
    date: '2024-02-20',
    helpful: 156,
  },
]

export function getAssetBySlug(slug: string): Asset | undefined {
  return assets.find(a => a.slug === slug)
}

export function getAssetById(id: string): Asset | undefined {
  return assets.find(a => a.id === id)
}

export function getReviewsForAsset(assetId: string): Review[] {
  return reviews.filter(r => r.assetId === assetId)
}

export function filterAssets(
  searchQuery: string,
  category: string | null,
  priceFilter: string,
  sortBy: string
): Asset[] {
  let filtered = [...assets]

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(
      a =>
        a.name.toLowerCase().includes(query) ||
        a.shortDescription.toLowerCase().includes(query) ||
        a.tags.some(t => t.toLowerCase().includes(query))
    )
  }

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter(a => a.category === category)
  }

  // Price filter
  if (priceFilter === 'free') {
    filtered = filtered.filter(a => a.price === 0)
  } else if (priceFilter === 'paid') {
    filtered = filtered.filter(a => a.price > 0)
  } else if (priceFilter === 'on-sale') {
    filtered = filtered.filter(a => a.isOnSale)
  }

  // Sort
  switch (sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      break
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'popular':
      filtered.sort((a, b) => b.reviewCount - a.reviewCount)
      break
    default:
      // relevance - featured first, then by rating
      filtered.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return b.rating - a.rating
      })
  }

  return filtered
}
