import React from 'react'

// Root layout passthrough — each route group provides its own <html>/<body>.
// The (payload) group uses Payload's RootLayout; (frontend) uses its own.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
