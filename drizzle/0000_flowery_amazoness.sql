CREATE TABLE "blogs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blogs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"author" text NOT NULL,
	"url" text NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;