import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

import wildlife1 from "@/assets/wildlife-1.jpg";
import wildlife2 from "@/assets/wildlife-2.jpg";
import wildlife3 from "@/assets/wildlife-3.jpg";
import wildlife4 from "@/assets/wildlife-4.jpg";
import wildlife5 from "@/assets/wildlife-5.jpg";
import wildlife6 from "@/assets/wildlife-6.jpg";

const photos = [
  { src: wildlife1, caption: "Sunrise patience", alt: "Leopard on tree branch at sunrise" },
  { src: wildlife2, caption: "Quiet wanderer", alt: "Elephant silhouette at dawn" },
  { src: wildlife3, caption: "Vibrant focus", alt: "Kingfisher bird on branch" },
  { src: wildlife4, caption: "Freedom in flight", alt: "Eagle soaring in sky" },
  { src: wildlife5, caption: "Winter's observer", alt: "Fox in snow" },
  { src: wildlife6, caption: "Golden gathering", alt: "Deer herd at sunset" },
];

const Photography = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section id="photography" className="section-container bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-6 text-center fade-in">Photography</h2>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto fade-in">
          Wildlife photography helps me think differently about perception and adaptation — qualities central to both natural and artificial intelligence.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-delay">
          {photos.map((photo, index) => (
            <div 
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer shadow-soft hover:shadow-card transition-all duration-300"
              onClick={() => setSelectedPhoto(index)}
            >
              <img 
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-primary-foreground font-medium">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={selectedPhoto !== null} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-7xl w-full p-0 border-0 bg-transparent">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-50 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          {selectedPhoto !== null && (
            <div className="relative w-full h-[90vh] flex items-center justify-center">
              <img 
                src={photos[selectedPhoto].src}
                alt={photos[selectedPhoto].alt}
                className="max-w-full max-h-full object-contain"
              />
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                {photos[selectedPhoto].caption}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Photography;
