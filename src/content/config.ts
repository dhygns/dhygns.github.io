import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    company: z.string(),
    period: z.string(), // human, e.g. "2024 — present"
    role: z.string().optional(),
    summary: z.string(), // 1-2 sentence pitch shown on bento card + page subhead
    cover: z.string().optional(), // /images/<file>.png — bento + detail header
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().default(""),
        }),
      )
      .default([]),
    accent: z.string().default("#FF6B35"),
    span: z
      .enum(["1x1", "2x1", "1x2", "2x2"])
      .default("1x1"), // bento layout
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string().url(),
        }),
      )
      .default([]),
    awards: z.array(z.string()).default([]),
    patents: z
      .array(
        z.object({
          title: z.string(),
          href: z.string().url().optional(),
          appNo: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

const log = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.string(), // jekyll | graphics | gitlab | unity-native
    date: z.coerce.date().optional(),
    keywords: z.array(z.string()).default([]),
    summary: z.string().optional(),
  }),
});

export const collections = { projects, log };
