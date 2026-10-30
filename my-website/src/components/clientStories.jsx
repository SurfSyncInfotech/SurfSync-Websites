import ameer from "../assets/client-ameer.webp";
import ameerCutout from "../assets/client-ameer-cutout.webp";
import shubham from "../assets/client-shubham.webp";
import mohanInitial from "../assets/client-mohan-initial.svg";

/* client testimonials shared by the home "Trusted by Visionaries" block and every case study */
const clientStories = [
  {
    /* cut out onto a white blob, matching the other story */
    photo: ameerCutout,
    avatar: ameer,
    cutout: true,
    quote:
      "We needed an online tyre store where customers can find the right size and brand without calling us again and again. SurfSync built Drive Tribe Tyres with clear filters, a full catalog, and a checkout that is simple to complete. The team understood how our riders shop — they listened, showed us updates, and delivered a site we are happy to share. Orders are easier to manage now, and customers can browse and buy with confidence. I would recommend SurfSync Infotech to anyone who wants a serious e-commerce website, not just a brochure.",
    name: "Ameer Sohail",
    company: "Drive Tribe Tyres",
  },
  {
    photo: shubham,
    cutout: true,
    quote:
      "SurfSync infotech brought clarity to complex problems, breaking down barriers and delivering innovative solutions. Their team was responsive, understood our needs quickly, and turned ideas into real, measurable results.",
    name: "Shubham Sutar",
    company: "Infocus Publications",
  },
  {
    /* no photo yet: his initial stands in, so the card keeps the same shape as the others */
    photo: mohanInitial,
    cutout: false,
    quote:
      "I was faced with settling an Estate and knew we needed a website, with almost NO experience of how to take the first step. SurfSync Infotech tutored, guided and encouraged my colleagues, family and me, answering our many ‘complicated’ questions with clear, simple answers and far more support than we ever envisaged, often out of hours for our UK and Australia connections. If you are 50 plus and need help, this company will guide you and it will happen.",
    name: "Mohan",
    company: "StampsFromEverywhere, Andhra Pradesh",
  },
];

export default clientStories;
