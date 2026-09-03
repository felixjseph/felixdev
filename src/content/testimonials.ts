type Testimonial = {
  business: string;
  logo: string;
  logoStyle: "softpoint" | "sayu";
  quote: string | null;
  emphasis?: string;
  rating: 1 | 2 | 3 | 4 | 5 | null;
  sample?: boolean;
};

// Felix approved the existing Softpoint quote/attribution in this iteration.
// Sayu copy/rating are a sample explicitly requested by Felix, not received client feedback.
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
    sample: true,
  },
];
