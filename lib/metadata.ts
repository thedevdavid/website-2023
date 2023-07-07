import { AuthorType, SiteMetaData } from "@/types";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const defaultAuthor: AuthorType = {
  name: "David Levai",
  handle: "@thedevdavid",
  social: {
    github: "https://github.com/thedevdavid",
    instagram: "https://instagram.com/thedevdavid",
    linkedin: "https://linkedin.com/in/thedevdavid",
    tiktok: "https://tiktok.com/@thedevdavid",
    twitter: "https://twitter.com/thedevdavid",
    youtube: "https://youtube.com/@thedevdavid",
  },
  email: "david@davidlevai.com",
  website: "https://davidlevai.com",
  jobTitle: "Indie Maker",
  company: "Freelancer",
  availableForWork: false,
  location: {
    city: "Barcelona",
    media: "/barcelona.jpg",
  },
};

const defaultTitle = `${defaultAuthor.name}'s Digital Garden`;
const defaultDescription = `I'm ${defaultAuthor.name}. Building hackin’ cool digital products around the world 🌴.`;

const siteMetadata: SiteMetaData = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  description: defaultDescription,
  siteRepo: "https://github.com/thedevdavid/website-2023",
  metadataBase: new URL(BASE_URL),
  newsletterUrl: "https://developreneur.davidlevai.com",
  analyticsProvider: "umami",
};

export default siteMetadata;
