import type { MetadataRoute } from "next"

// Private page: keep it out of search.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } }
}
