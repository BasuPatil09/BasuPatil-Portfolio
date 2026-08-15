import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, relative, sep } from 'node:path'

const IMAGE_EXTENSIONS = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp'])

function walkImages(directory) {
  if (!statSync(directory, { throwIfNoEntry: false })?.isDirectory()) return []
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = resolve(directory, entry.name)
    if (entry.isDirectory()) return walkImages(target)
    const extension = entry.name.slice(entry.name.lastIndexOf('.')).toLowerCase()
    return IMAGE_EXTENSIONS.has(extension) ? [target] : []
  })
}

function imagesIn(folder) {
  const root = resolve(process.cwd(), 'public', 'images', folder)
  return walkImages(root)
    .sort((left, right) => left.localeCompare(right))
    .map((file) => ({
      src: `/images/${folder}/${relative(root, file).split(sep).join('/')}`,
      label: relative(root, file).replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    }))
}

function galleryManifest() {
  const output = resolve(process.cwd(), 'src', 'data', 'gallery.generated.js')
  const writeManifest = () => {
    mkdirSync(resolve(process.cwd(), 'src', 'data'), { recursive: true })
    const collections = {
      workAndGroupPhotos: imagesIn('work-and-group'),
      personalPhotos: imagesIn('personal'),
    }
    writeFileSync(output, `// Generated automatically from public/images/work-and-group and public/images/personal.\n${Object.entries(collections).map(([name, images]) => `export const ${name} = ${JSON.stringify(images, null, 2)}`).join('\n\n')}\n`)
  }
  return {
    name: 'gallery-manifest',
    buildStart() {
      writeManifest()
    },
    configureServer(server) {
      const imagesRoot = resolve(process.cwd(), 'public', 'images')
      server.watcher.add(imagesRoot)
      const refresh = (file) => {
        if (!file.startsWith(imagesRoot)) return
        writeManifest()
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
      server.watcher.on('change', refresh)
    },
  }
}

export default defineConfig({
  plugins: [galleryManifest(), react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap', 'gsap/ScrollTrigger'],
        },
      },
    },
  },
})
