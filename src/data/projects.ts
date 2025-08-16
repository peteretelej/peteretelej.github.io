export interface Project {
  name: string;
  description: string;
  url: string;
  image: string;
  technologies: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: "The Online Kenyan",
    description: "Kenyan news platform with AI summaries & live TV",
    url: "https://www.theonlinekenyan.com/",
    image: "https://etelej.com/static/images/portfolio/theok.png",
    technologies: ["Go", "React", "AI/ML"],
    featured: true
  },
  {
    name: "My Sukari",
    description: "Diabetes management with AI carb counter",
    url: "https://mysukari.com/",
    image: "https://etelej.com/static/images/portfolio/mysukari.png", 
    technologies: ["AI/ML", "Healthcare"],
    featured: true
  },
  {
    name: "Tree CLI",
    description: "Directory structure visualizer",
    url: "https://peteretelej.github.io/tree/",
    image: "https://etelej.com/static/images/portfolio/tree.png",
    technologies: ["Rust", "CLI"],
    featured: true
  },
  {
    name: "Image Assets Generator", 
    description: "Generate multiple image sizes from source",
    url: "https://image-assets.etelej.com/",
    image: "https://etelej.com/static/images/portfolio/image-assets-2.png",
    technologies: ["JavaScript", "Tools"],
    featured: true
  },
  {
    name: "Kenyan News Mobile App",
    description: "Kenyan News mobile app built with Flutter",
    url: "https://play.google.com/store/apps/details?id=com.theonlinekenyan.news",
    image: "https://etelej.com/static/images/portfolio/newsapp.png", 
    technologies: ["Flutter", "Mobile"],
    featured: true
  }
];

export const featuredProjects = projects.filter(project => project.featured);