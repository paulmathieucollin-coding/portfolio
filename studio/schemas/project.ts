import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projet',
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
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'Photo' },
          { title: 'Vidéo', value: 'Vidéo' },
          { title: 'Direction', value: 'Direction' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Mots-clés pour le filtrage avancé (ex: mode, architecture, portrait, corporate...)',
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(2100).integer(),
    }),
    defineField({
      name: 'featured',
      title: 'Mis en avant',
      type: 'boolean',
      description: 'Afficher ce projet en featured sur la homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Numéro d\'ordre pour le tri manuel (plus petit = affiché en premier). Laisser vide pour tri par année.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: "Galerie d'images",
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Vidéos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titre',
              type: 'string',
            },
            {
              name: 'muxPlaybackId',
              title: 'Mux Playback ID',
              type: 'string',
              description: 'ID de lecture Mux (ex: abc123xyz...). Prioritaire sur l\'URL si renseigné.',
            },
            {
              name: 'url',
              title: 'URL (lien direct MP4)',
              type: 'url',
              description: 'Utilisé seulement si pas de Mux Playback ID.',
            },
            {
              name: 'aspectRatio',
              title: 'Format',
              type: 'string',
              options: {
                list: [
                  { title: '16:9 — Paysage', value: '16/9' },
                  { title: '9:16 — Portrait (mobile)', value: '9/16' },
                  { title: '4:3 — Classique', value: '4/3' },
                  { title: '1:1 — Carré', value: '1/1' },
                ],
                layout: 'radio',
              },
              initialValue: '16/9',
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'challenge',
      title: 'Enjeu',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'approach',
      title: 'Approche',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'credits',
      title: 'Crédits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'role',
              title: 'Rôle',
              type: 'string',
              description: 'Ex: Photographe, Directeur artistique, Styliste...',
            },
            {
              name: 'name',
              title: 'Nom',
              type: 'string',
            },
          ],
          preview: {
            select: { title: 'role', subtitle: 'name' },
          },
        },
      ],
    }),
    defineField({
      name: 'externalLink',
      title: 'Lien externe',
      type: 'url',
      description: 'Lien vers le site du client, la publication, etc.',
    }),
  ],
  orderings: [
    {
      title: 'Ordre manuel',
      name: 'sortOrderAsc',
      by: [
        { field: 'sortOrder', direction: 'asc' },
        { field: 'year', direction: 'desc' },
      ],
    },
    {
      title: 'Année (récent → ancien)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      year: 'year',
      featured: 'featured',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, category, year, featured, media } = selection
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: `${category} · ${year}`,
        media,
      }
    },
  },
})
