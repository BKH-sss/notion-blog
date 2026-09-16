const CONFIG = {
  // profile setting (required)
  profile: {
    name: "skadi",
    image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Full-Stack Developer & AI Researcher",
    bio: "기술과 개발, 인공지능에 대한 탐구와 일상을 기록하는 공간입니다.",
    email: "",
    linkedin: "",
    github: "BKH-sss",
    instagram: "",
  },
  projects: [
    {
      name: `백경환의 T4`,
      href: "https://github.com/BKH-sss/notion-blog",
    },
    {
      name: `Portal Hub`,
      href: "https://bkh-sss.github.io/portal-hub/",
    },
    {
      name: `Skadi Bot`,
      href: "https://github.com/BKH-sss/skadi-discord-bot",
    },
  ],
  // blog setting (required)
  blog: {
    title: "백경환의 T4",
    description: "기술과 인공지능, 개발 여정을 기록하는 T4 테크 블로그입니다.",
    scheme: "system", // 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "",
  since: 2026, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID || "3ce70b4257868081972fc7fb429a6e88",
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "BKH-sss/notion-blog",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }
