import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const shared = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: shared.extend({
    type: z.enum(["blog", "note"]).default("blog"),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: shared.extend({
    repo: z.url().optional(),
    demo: z.url().optional(),
    paper: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    paper: z.string().optional(),
    code: z.url().optional(),
    project: z.url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects, publications };
