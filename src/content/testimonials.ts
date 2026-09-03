type Testimonial = {
  business: string;
  logo: string;
  logoStyle: "softpoint" | "sayu";
  quote: string | null;
  emphasis?: string;
  rating: 1 | 2 | 3 | 4 | 5 | null;
};

// Felix approved both client entries, their wording, and their five-star ratings.
export const testimonials: Testimonial[] = [
  {
    business: "Softpoint Enterprise",
    logo: "/images/brands/softpoint-enterprise.jpg",
    logoStyle: "softpoint",
    quote: "Felix understands what the work needs.",
    emphasis: "Clear, practical solutions that create value.",
    rating: 5,
  },
  {
    business: "Sayu Café",
    logo: "/images/brands/sayu.jpg",
    logoStyle: "sayu",
    quote: "Easy to work with and thoughtful about the details.",
    emphasis: "Felix made the whole process feel simple.",
    rating: 5,
  },
];
