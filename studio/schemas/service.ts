import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Accroche',
      type: 'text',
      rows: 3,
      description: 'Texte court sous le titre principal.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Image hero',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'offerings',
      title: 'Prestations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Intitulé',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'text' },
          },
        },
      ],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galerie',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texte du bouton CTA',
      type: 'string',
      initialValue: 'Discuter d\'un projet',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Lien du bouton CTA',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Numéro d\'ordre sur la page Solutions (plus petit = affiché en premier).',
    }),
    defineField({
      name: 'milestones',
      title: 'Parcours / Timeline',
      type: 'array',
      description: 'Optionnel — pour les pages avec une chronologie (ex: Production PMC).',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Année',
              type: 'string',
            },
            {
              name: 'text',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: { title: 'year', subtitle: 'text' },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Ordre manuel',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      sortOrder: 'sortOrder',
    },
    prepare(selection) {
      const { title, media, sortOrder } = selection
      return {
        title,
        subtitle: sortOrder ? `Ordre: ${sortOrder}` : 'Pas d\'ordre défini',
        media,
      }
    },
  },
})
