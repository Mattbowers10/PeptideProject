import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Peptides } from './collections/Peptides'
import { Studies } from './collections/Studies'
import { Categories } from './collections/Categories'
import { Partners } from './collections/Partners'
import { AffiliateLinks } from './collections/AffiliateLinks'
import { ClickEvents } from './collections/ClickEvents'
import { Media } from './collections/Media'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Peptide Wiki',
    },
  },
  collections: [
    Users,
    Peptides,
    Studies,
    Categories,
    Partners,
    AffiliateLinks,
    ClickEvents,
    Media,
  ],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI!,
    },
  }),
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(process.cwd(), 'src/payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(process.cwd(), 'src/generated-schema.graphql'),
  },
})
