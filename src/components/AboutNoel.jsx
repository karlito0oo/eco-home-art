const AboutNoel = () => {
  return (
    <section className="relative bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-stretch">
          {/* Text Content */}
          <div className="flex flex-1 flex-col justify-center lg:pr-12">
            <h2 className="mb-8 text-4xl font-bold text-green-800 md:text-5xl lg:text-6xl">
              NOEL TAÑADA
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700">
              <p>
              He worked as a furniture designer for well-known firms in the industry such as Drexel Heritage, Henredon, Ethan Allen, Ralph Lauren, Laurel's and Crate & Barrel.
              </p>
              
              <p>
              He undertook residential and commercial projects as an interior designer in West Hollywood, Beverly Hills & Malibu, California and built his own furniture design and manufacturing companu in the US, Tañada International. 
              </p>
              
              <p>
              He created Ecohomeart in 2015, the pioneering brand of ecofriendly furniture, lighting and accessories using water hyacinth, doy pack, palochina, rebar and other agricultural waste materials.
              </p>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative flex-1">
            <img
              src="/noel-tanada.png"
              alt="Noel Tañada"
              className="h-full w-full rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Alpha Logo */}
      <img
        src="/alpha-logo.png"
        alt="Alpha Logo"
        className="absolute bottom-4 right-4 h-12 w-auto md:h-16 lg:h-20"
      />
    </section>
  );
};

export default AboutNoel; 