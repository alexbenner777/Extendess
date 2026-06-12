import { FadeIn, StaggerContainer, StaggerItem } from "../ui-extras/animations";
import gallery1 from "@assets/images/gallery-1.png";

export function Gallery() {
  // Using the same generated image for the gallery but with different crop/aspect ratios for masonry look
  const images = [
    { src: gallery1, className: "col-span-1 md:col-span-2 row-span-2" },
    { src: gallery1, className: "col-span-1 row-span-1" },
    { src: gallery1, className: "col-span-1 row-span-1" },
    { src: gallery1, className: "col-span-1 md:col-span-2 row-span-1" },
    { src: gallery1, className: "col-span-1 row-span-2" },
    { src: gallery1, className: "col-span-1 row-span-1" }
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <FadeIn className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">
            <span className="italic text-primary">Атмосфера</span> ателье
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 md:gap-6 h-[800px]">
          {images.map((img, idx) => (
            <StaggerItem key={idx} className={`relative overflow-hidden group ${img.className}`}>
              <img 
                src={img.src} 
                alt={`Gallery ${idx}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
