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

export interface SanityCredit {
  _key: string
  role?: string
  name?: string
}

export interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  category: 'Photo' | 'Vidéo' | 'Direction'
  tags?: string[]
  year: number
  featured?: boolean
  sortOrder?: number
  mainImage: SanityImage
  previewVideo?: string   // muxPlaybackId du premier video (query home)
  gallery?: SanityImage[]
  videos?: SanityVideo[]
  description?: string
  challenge?: string
  approach?: string
  credits?: SanityCredit[]
  externalLink?: string
}

// ── Types pour les services ──

export interface SanityServiceOffering {
  _key: string
  label?: string
  text?: string
}

export interface SanityServiceMilestone {
  _key: string
  year?: string
  text?: string
}

export interface SanityServiceImage extends SanityImage {
  alt?: string
}

export interface SanityService {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  heroImage?: SanityImage
  offerings?: SanityServiceOffering[]
  galleryImages?: SanityServiceImage[]
  ctaLabel?: string
  ctaLink?: string
  sortOrder?: number
  milestones?: SanityServiceMilestone[]
}
