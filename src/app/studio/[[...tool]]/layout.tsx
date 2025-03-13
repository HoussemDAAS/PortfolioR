import { Metadata } from 'next';
import React from 'react'
//src/app/studio/[[...tool]]/layout.tsx
export const metadata: Metadata = {
    title: "Rayen El maamoun",
    description: "EDITOR, VFX ARTIST & CONTENT CREATOR",
  };
const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <html lang="fr">
        <body>
            {children}
        </body>
    </html>
  )
}

export default RootLayout
