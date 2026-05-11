/** @type {import('next-sitemap').IConfig} */

const LOCALES = ["ko", "en"];
const CATEGORY_SLUGS = [
  "website",
  "shopping-mall",
  "logo-business-card",
  "detail-page",
  "ppt-design",
  "automation-app",
  "video-content",
];

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*"],
  additionalPaths: async (config) => {
    const paths = [];
    for (const locale of LOCALES) {
      for (const slug of CATEGORY_SLUGS) {
        paths.push(
          await config.transform(config, `/${locale}/services/${slug}`),
          await config.transform(config, `/${locale}/portfolio/category/${slug}`)
        );
      }
    }
    return paths;
  },
  transform: async (config, path) => {
    const isCategory =
      path.includes("/services/") || path.includes("/portfolio/category/");
    return {
      loc: path,
      changefreq: isCategory ? "weekly" : "monthly",
      priority: isCategory ? 0.9 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
