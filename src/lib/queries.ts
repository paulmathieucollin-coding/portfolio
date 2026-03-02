// Liste de tous les projets (pour la grille)
export const projectsQuery = `
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    slug,
    category,
    year,
    mainImage,
  }
`

// Un projet par son slug (pour la page détail)
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    year,
    mainImage,
    gallery,
    videos,
    description,
    challenge,
    approach,
  }
`
