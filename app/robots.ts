import { MetadataRoute } from "next";
import { domain } from "@/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/zh/", "/_next/"],
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
