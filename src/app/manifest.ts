import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SteadFast International',
        short_name: 'SteadFast',
        description: 'Your trusted source for quality products',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#184193',
        icons: [
            {
                src: '/icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],

    }
}