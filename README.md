src/
├── app/
│   ├── layout.tsx                 ← রুট লেআউট (হেডার, ফুটার সহ)
│   ├── page.tsx                   ← হোমপেজ
│   ├── sitemap.xml.ts             ← সাইটম্যাপ জেনারেটর (SEO জন্য)
│   ├── robots.txt.ts              ← সার্চ ইঞ্জিন নির্দেশিকা
│
│   ├── news/
│   │   ├── page.tsx               ← সব নিউজ লিস্ট পেজ
│   │   ├── [slug]/                ← ডায়নামিক রাউট (একটি নিউজ পোস্ট)
│   │   │   ├── page.tsx           ← প্রতিটি নিউজ পোস্ট পেজ
│   │   │   └── metadata.ts        ← SEO মেটাডেটা জেনারেশন
│
│   ├── category/
│   │   ├── [category]/            ← ক্যাটাগরি অনুযায়ী নিউজ
│   │   │   ├── page.tsx
│   │   │   └── metadata.ts
│
│   ├── about/
│   │   └── page.tsx               ← অ্যাবাউট পেজ
│
│   ├── contact/
│   │   └── page.tsx               ← কন্টাক্ট পেজ
│
│   └── api/                       ← অ্যাপিআই রাউট (যদি দরকার হয়)
│       └── rss/route.ts          ← RSS ফিড জেনারেটর (optional)
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── NewsCard.tsx
│   ├── CategoryList.tsx
│   └── SEO.tsx                   ← Custom SEO কম্পোনেন্ট (optional)
│
├── lib/
│   ├── getNews.ts                ← নিউজ ফেচার ফাংশন
│   ├── getCategories.ts
│   └── getSingleNews.ts
│
├── styles/
│   └── globals.css
│
├── assets/
│   └── images/
│
├── types/
│   └── index.ts                  ← টাইপ ডেফিনিশন (e.g., News, Category)
│
├── constants/
│   └── site.ts                   ← সাইটের নাম, বেস URL, etc.
│
└── utils/
    └── slugify.ts                ← টাইটেল থেকে URL বানানোর হেল্পার
