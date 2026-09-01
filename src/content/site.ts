export type PublicSiteConfig = {
  publicContact: {
    email: string;
    facebook: string;
    phone: string;
  };
  resume: {
    url: string;
  };
};

export const siteConfig: PublicSiteConfig = {
  publicContact: {
    email: "",
    facebook: "",
    phone: "",
  },
  resume: {
    url: "",
  },
};
