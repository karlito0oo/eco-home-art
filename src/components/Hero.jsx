import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/hero1.jpg', '/hero2.jpg', '/hero3.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-neutral-100">
      {/* Background Images Slider */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Hero ${index + 1}`}
              className="h-full w-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 text-center text-white">
        <img
          src="/eco-logo.png"
          alt="Eco Home Art"
          className="mb-8 w-full max-w-md animate-fade-in"
        />
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Sustainable Living,
          <br />
          Artistic Design
        </h1>
        <p className="mb-8 max-w-2xl text-lg md:text-xl">
          Transform your space with our eco-friendly furniture, lighting, and accessories
        </p>
        
        <button className="rounded-full bg-green-800 px-8 py-3 text-lg font-semibold transition-all hover:bg-green-700 hover:shadow-lg">
        <a 
          href="https://alphadds.com" 
          target="_blank" 
          rel="noopener noreferrer" 
        >
          by: Alpha Distinct Development Solutions Inc.
        </a>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentImage === index
                  ? 'w-8 bg-white'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero; 