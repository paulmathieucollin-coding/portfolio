// Liste de tous les projets (pour la grille + homepage)
export const projectsQuery = `
  *[_type == "project"] | order(coalesce(sortOrder, 999) asc, year desc) {
    _id,
    title,
    slug,
    category,
    tags,
    year,
    featured,
    sortOrder,
    mainImage,
    "previewVideo": videos[0].muxPlaybackId,
  }
`

// Un projet par son slug (pour la page détail)
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    tags,
    year,
    featured,
    mainImage,
    gallery,
    videos,
    description,
    challenge,
    approach,
    credits,
    externalLink,
  }
`

// Tous les tags distincts (pour le filtrage avancé)
export const allTagsQuery = `
  array::unique(*[_type == "project" && defined(tags)].tags[])
`

// Liste de tous les services (pour la page Solutions index)
export const servicesQuery = `
  *[_type == "service"] | order(coalesce(sortOrder, 999) asc) {
    _id,
    title,
    slug,
    tagline,
    heroImage,
    ctaLabel,
    ctaLink,
    sortOrder,
  }
`

// Un service par son slug (pour la page service détail)
export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    tagline,
    heroImage,
    offerings,
    galleryImages,
    ctaLabel,
    ctaLink,
    milestones,
  }
`
