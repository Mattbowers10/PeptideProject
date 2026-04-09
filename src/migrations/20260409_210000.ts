import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "email_subscribers" (
    "id" serial PRIMARY KEY NOT NULL,
    "email" varchar NOT NULL,
    "source" varchar DEFAULT 'homepage',
    "peptide_slug" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  CREATE UNIQUE INDEX IF NOT EXISTS "email_subscribers_email_idx" ON "email_subscribers" USING btree ("email");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "email_subscribers";
  DROP INDEX IF EXISTS "email_subscribers_email_idx";
  `)
}
