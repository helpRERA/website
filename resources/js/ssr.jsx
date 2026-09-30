import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

const appName = 'Laravel'

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) =>
      resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup: ({ App, props }) => {
      return <App {...props} />
    },
  })
)
