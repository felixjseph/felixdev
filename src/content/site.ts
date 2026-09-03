export type PublicSiteConfig = {
  resumeUrl: string;
  publicContact: {
    email: string;
    facebook: string;
    location: string;
    phone: string;
  };
};

export const siteConfig: PublicSiteConfig = {
  resumeUrl: "/downloads/felix-dev-cv.pdf",
  publicContact: {
    email: "felixjosephcastaneda@gmail.com",
    facebook: "",
    location: "San Fernando, Cebu, PH",
    phone: "0943 246 9897",
  },
};
