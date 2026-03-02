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

export interface SanityVideo {
  _key: string
  title?: string
  url?: string
  muxPlaybackId?: string
  aspectRatio?: '16/9' | '9/16' | '4/3' | '1/1'
}

export interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  category: 'Photo' | 'Vidéo' | 'Direction'
  year: number
  mainImage: SanityImage
  gallery?: SanityImage[]
  videos?: SanityVideo[]
  description?: string
  challenge?: string
  approach?: string
}
