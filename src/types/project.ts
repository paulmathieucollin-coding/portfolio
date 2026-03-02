export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  _type: 'image'
  asset: SanityImageAsset
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  category: 'Photo' | 'Vidéo' | 'Direction'
  year: number
  mainImage: SanityImage
  gallery?: SanityImage[]
  description?: string
  challenge?: string
  approach?: string
}
