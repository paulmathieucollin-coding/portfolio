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
      name: 'year',
      title: 'Année',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(2100).integer(),
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
              title: 'URL (YouTube, Vimeo, ou lien direct MP4)',
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
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      year: 'year',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, category, year, media } = selection
      return {
        title,
        subtitle: `${category} · ${year}`,
        media,
      }
    },
  },
})
