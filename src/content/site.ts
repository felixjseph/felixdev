export type PublicSiteConfig = {
  publicContact: {
    email: string;
    linkedIn: string;
  };
  resume: {
    url: string;
  };
};

export const siteConfig = {
  publicContact: {
    email: "",
    linkedIn: "",
  },
  resume: {
    url: "",
  },
} as const satisfies PublicSiteConfig;
