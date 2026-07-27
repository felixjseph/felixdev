export type Certification = {
  title: string;
  issuer: string;
  date?: string;
  verifyHref?: string;
  credentialId?: string;
};

export const certifications: Certification[] = [
  {
    title: "AWS Cloud Architecting",
    issuer: "AWS Academy",
    date: "Nov 2025",
    verifyHref:
      "https://www.credly.com/badges/5fd763af-f4f8-4e92-9fe3-cbe53c103ae3",
  },
  {
    title: "AWS Cloud Foundations",
    issuer: "AWS Academy",
    date: "Sep 2025",
    verifyHref:
      "https://www.credly.com/badges/f1bbf739-17de-4a58-85ff-308a7d7fbc97",
  },
  {
    title: "Information Representation and Data Organization",
    issuer: "Huawei",
    credentialId: "ICT20230403000186",
  },
  {
    title: "Data Storage Technology",
    issuer: "Huawei",
    date: "Mar 2023",
    credentialId: "ICT20230302000021",
  },
];
