import { personalPhotos, workAndGroupPhotos } from '../data/gallery.generated'

/* Hero remains fixed. The other sections populate automatically from their folders. */
export const media = {
  hero: {
    src: '/images/portrait.jpeg',
    alt: 'Basu Patil',
  },
}

export const archivePhotos = workAndGroupPhotos
export const finalGalleryPhotos = personalPhotos.slice(0, 5)
