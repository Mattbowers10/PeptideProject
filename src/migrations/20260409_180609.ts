import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'partner', 'member');
  CREATE TYPE "public"."enum_users_membership_tier" AS ENUM('free', 'researcher', 'pro');
  CREATE TYPE "public"."enum_peptides_administration_routes_route" AS ENUM('subcutaneous', 'intramuscular', 'intravenous', 'oral', 'intranasal', 'transdermal', 'topical');
  CREATE TYPE "public"."enum_peptides_research_status" AS ENUM('preclinical', 'phase1', 'phase2', 'phase3', 'approved', 'discontinued');
  CREATE TYPE "public"."enum_studies_study_type" AS ENUM('in-vitro', 'animal', 'human', 'review', 'meta-analysis', 'case-study');
  CREATE TYPE "public"."enum_studies_source" AS ENUM('pubmed', 'manual');
  CREATE TYPE "public"."enum_partners_status" AS ENUM('active', 'pending', 'suspended');
  CREATE TYPE "public"."enum_partners_verification_tier" AS ENUM('basic', 'verified', 'premium');
  CREATE TYPE "public"."enum_click_events_device_type" AS ENUM('desktop', 'mobile', 'tablet', 'unknown');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'member' NOT NULL,
  	"membership_tier" "enum_users_membership_tier" DEFAULT 'free' NOT NULL,
  	"membership_expires_at" timestamp(3) with time zone,
  	"stripe_customer_id" varchar,
  	"stripe_subscription_id" varchar,
  	"partner_profile_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "peptides_aliases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"alias" varchar
  );
  
  CREATE TABLE "peptides_administration_routes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"route" "enum_peptides_administration_routes_route",
  	"notes" varchar
  );
  
  CREATE TABLE "peptides_pubmed_search_terms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"term" varchar
  );
  
  CREATE TABLE "peptides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"cas_number" varchar,
  	"molecular_formula" varchar,
  	"molecular_weight" varchar,
  	"research_status" "enum_peptides_research_status" DEFAULT 'preclinical' NOT NULL,
  	"summary" varchar NOT NULL,
  	"mechanism_of_action" jsonb,
  	"pharmacokinetics" jsonb,
  	"research_findings" jsonb,
  	"half_life" varchar,
  	"side_effects_and_safety" jsonb,
  	"legal_status" jsonb,
  	"last_pubmed_sync" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "peptides_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"studies_id" integer,
  	"affiliate_links_id" integer
  );
  
  CREATE TABLE "studies_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"pubmed_id" varchar NOT NULL,
  	"doi" varchar,
  	"title" varchar NOT NULL,
  	"journal" varchar,
  	"published_date" timestamp(3) with time zone,
  	"url" varchar,
  	"abstract" varchar,
  	"study_type" "enum_studies_study_type",
  	"key_findings" jsonb,
  	"quality_score" numeric,
  	"synced_at" timestamp(3) with time zone,
  	"source" "enum_studies_source" DEFAULT 'pubmed',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "studies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"peptides_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"icon" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"logo_id" integer,
  	"website" varchar NOT NULL,
  	"status" "enum_partners_status" DEFAULT 'pending' NOT NULL,
  	"verification_tier" "enum_partners_verification_tier" DEFAULT 'basic',
  	"accepted_terms_at" timestamp(3) with time zone,
  	"commission_rate" numeric,
  	"contact_email" varchar NOT NULL,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"peptides_id" integer
  );
  
  CREATE TABLE "affiliate_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"partner_id" integer NOT NULL,
  	"peptide_id" integer NOT NULL,
  	"tracking_code" varchar,
  	"destination_url" varchar NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"clicks" numeric DEFAULT 0,
  	"unique_clicks" numeric DEFAULT 0,
  	"last_click_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "click_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"affiliate_link_id" integer NOT NULL,
  	"referrer" varchar,
  	"country" varchar,
  	"device_type" "enum_click_events_device_type",
  	"is_unique" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"peptides_id" integer,
  	"studies_id" integer,
  	"categories_id" integer,
  	"partners_id" integer,
  	"affiliate_links_id" integer,
  	"click_events_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_partner_profile_id_partners_id_fk" FOREIGN KEY ("partner_profile_id") REFERENCES "public"."partners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "peptides_aliases" ADD CONSTRAINT "peptides_aliases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."peptides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "peptides_administration_routes" ADD CONSTRAINT "peptides_administration_routes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."peptides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "peptides_pubmed_search_terms" ADD CONSTRAINT "peptides_pubmed_search_terms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."peptides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "peptides" ADD CONSTRAINT "peptides_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "peptides_rels" ADD CONSTRAINT "peptides_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."peptides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "peptides_rels" ADD CONSTRAINT "peptides_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "peptides_rels" ADD CONSTRAINT "peptides_rels_studies_fk" FOREIGN KEY ("studies_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "peptides_rels" ADD CONSTRAINT "peptides_rels_affiliate_links_fk" FOREIGN KEY ("affiliate_links_id") REFERENCES "public"."affiliate_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_authors" ADD CONSTRAINT "studies_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_rels" ADD CONSTRAINT "studies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_rels" ADD CONSTRAINT "studies_rels_peptides_fk" FOREIGN KEY ("peptides_id") REFERENCES "public"."peptides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_rels" ADD CONSTRAINT "partners_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_rels" ADD CONSTRAINT "partners_rels_peptides_fk" FOREIGN KEY ("peptides_id") REFERENCES "public"."peptides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "affiliate_links" ADD CONSTRAINT "affiliate_links_partner_id_partners_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "affiliate_links" ADD CONSTRAINT "affiliate_links_peptide_id_peptides_id_fk" FOREIGN KEY ("peptide_id") REFERENCES "public"."peptides"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "click_events" ADD CONSTRAINT "click_events_affiliate_link_id_affiliate_links_id_fk" FOREIGN KEY ("affiliate_link_id") REFERENCES "public"."affiliate_links"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_peptides_fk" FOREIGN KEY ("peptides_id") REFERENCES "public"."peptides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_studies_fk" FOREIGN KEY ("studies_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_affiliate_links_fk" FOREIGN KEY ("affiliate_links_id") REFERENCES "public"."affiliate_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_click_events_fk" FOREIGN KEY ("click_events_id") REFERENCES "public"."click_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_partner_profile_idx" ON "users" USING btree ("partner_profile_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "peptides_aliases_order_idx" ON "peptides_aliases" USING btree ("_order");
  CREATE INDEX "peptides_aliases_parent_id_idx" ON "peptides_aliases" USING btree ("_parent_id");
  CREATE INDEX "peptides_administration_routes_order_idx" ON "peptides_administration_routes" USING btree ("_order");
  CREATE INDEX "peptides_administration_routes_parent_id_idx" ON "peptides_administration_routes" USING btree ("_parent_id");
  CREATE INDEX "peptides_pubmed_search_terms_order_idx" ON "peptides_pubmed_search_terms" USING btree ("_order");
  CREATE INDEX "peptides_pubmed_search_terms_parent_id_idx" ON "peptides_pubmed_search_terms" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "peptides_slug_idx" ON "peptides" USING btree ("slug");
  CREATE INDEX "peptides_seo_seo_og_image_idx" ON "peptides" USING btree ("seo_og_image_id");
  CREATE INDEX "peptides_updated_at_idx" ON "peptides" USING btree ("updated_at");
  CREATE INDEX "peptides_created_at_idx" ON "peptides" USING btree ("created_at");
  CREATE INDEX "peptides_rels_order_idx" ON "peptides_rels" USING btree ("order");
  CREATE INDEX "peptides_rels_parent_idx" ON "peptides_rels" USING btree ("parent_id");
  CREATE INDEX "peptides_rels_path_idx" ON "peptides_rels" USING btree ("path");
  CREATE INDEX "peptides_rels_categories_id_idx" ON "peptides_rels" USING btree ("categories_id");
  CREATE INDEX "peptides_rels_studies_id_idx" ON "peptides_rels" USING btree ("studies_id");
  CREATE INDEX "peptides_rels_affiliate_links_id_idx" ON "peptides_rels" USING btree ("affiliate_links_id");
  CREATE INDEX "studies_authors_order_idx" ON "studies_authors" USING btree ("_order");
  CREATE INDEX "studies_authors_parent_id_idx" ON "studies_authors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "studies_pubmed_id_idx" ON "studies" USING btree ("pubmed_id");
  CREATE INDEX "studies_updated_at_idx" ON "studies" USING btree ("updated_at");
  CREATE INDEX "studies_created_at_idx" ON "studies" USING btree ("created_at");
  CREATE INDEX "studies_rels_order_idx" ON "studies_rels" USING btree ("order");
  CREATE INDEX "studies_rels_parent_idx" ON "studies_rels" USING btree ("parent_id");
  CREATE INDEX "studies_rels_path_idx" ON "studies_rels" USING btree ("path");
  CREATE INDEX "studies_rels_peptides_id_idx" ON "studies_rels" USING btree ("peptides_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "partners_slug_idx" ON "partners" USING btree ("slug");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "partners_rels_order_idx" ON "partners_rels" USING btree ("order");
  CREATE INDEX "partners_rels_parent_idx" ON "partners_rels" USING btree ("parent_id");
  CREATE INDEX "partners_rels_path_idx" ON "partners_rels" USING btree ("path");
  CREATE INDEX "partners_rels_peptides_id_idx" ON "partners_rels" USING btree ("peptides_id");
  CREATE INDEX "affiliate_links_partner_idx" ON "affiliate_links" USING btree ("partner_id");
  CREATE INDEX "affiliate_links_peptide_idx" ON "affiliate_links" USING btree ("peptide_id");
  CREATE UNIQUE INDEX "affiliate_links_tracking_code_idx" ON "affiliate_links" USING btree ("tracking_code");
  CREATE INDEX "affiliate_links_updated_at_idx" ON "affiliate_links" USING btree ("updated_at");
  CREATE INDEX "affiliate_links_created_at_idx" ON "affiliate_links" USING btree ("created_at");
  CREATE INDEX "click_events_affiliate_link_idx" ON "click_events" USING btree ("affiliate_link_id");
  CREATE INDEX "click_events_updated_at_idx" ON "click_events" USING btree ("updated_at");
  CREATE INDEX "click_events_created_at_idx" ON "click_events" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_peptides_id_idx" ON "payload_locked_documents_rels" USING btree ("peptides_id");
  CREATE INDEX "payload_locked_documents_rels_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("studies_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_affiliate_links_id_idx" ON "payload_locked_documents_rels" USING btree ("affiliate_links_id");
  CREATE INDEX "payload_locked_documents_rels_click_events_id_idx" ON "payload_locked_documents_rels" USING btree ("click_events_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "peptides_aliases" CASCADE;
  DROP TABLE "peptides_administration_routes" CASCADE;
  DROP TABLE "peptides_pubmed_search_terms" CASCADE;
  DROP TABLE "peptides" CASCADE;
  DROP TABLE "peptides_rels" CASCADE;
  DROP TABLE "studies_authors" CASCADE;
  DROP TABLE "studies" CASCADE;
  DROP TABLE "studies_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "partners_rels" CASCADE;
  DROP TABLE "affiliate_links" CASCADE;
  DROP TABLE "click_events" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_users_membership_tier";
  DROP TYPE "public"."enum_peptides_administration_routes_route";
  DROP TYPE "public"."enum_peptides_research_status";
  DROP TYPE "public"."enum_studies_study_type";
  DROP TYPE "public"."enum_studies_source";
  DROP TYPE "public"."enum_partners_status";
  DROP TYPE "public"."enum_partners_verification_tier";
  DROP TYPE "public"."enum_click_events_device_type";`)
}
