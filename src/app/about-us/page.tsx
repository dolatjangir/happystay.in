import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex items-center">
      {/* Background overlay for the left side (faded office meeting) */}
      <div className="absolute top-0 left-0 w-full lg:w-3/5 h-full -z-10">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
          alt="Team collaboration background"
          fill
          className="object-cover object-left opacity-15 grayscale"
          priority
        />
        {/* Gradient to seamlessly blend the background into the white space */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/80 to-white"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start max-w-xl z-10">
          <span className="text-[#3b2787] font-bold tracking-wider uppercase text-sm mb-4">
            About HappyStay:
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Creating Joyful Stays, <br className="hidden sm:block" /> Together.
          </h1>
          <p className="text-lg text-gray-800 mb-8 font-medium leading-relaxed">
            Our journey began with a simple belief: every trip should be full of
            happy moments. We are a team dedicated to handpicking the best stays
            and unforgettable experiences, ensuring you find your happy stay.
          </p>
          <button className="px-8 py-3 bg-white text-[#3b2787] font-semibold rounded-2xl shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(59,39,135,0.15)] transition-all duration-300 border border-gray-100">
            Our Story
          </button>
        </div>

        {/* Right Column: Staggered Image Grid */}
        <div className="relative w-full h-[600px] sm:h-[700px] grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5 z-10">
          
          {/* Grid Column 1 */}
          <div className="flex flex-col gap-3 sm:gap-4 translate-y-12 sm:translate-y-16">
            <div className="relative w-full h-48 sm:h-56 rounded-[2rem] overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80"
                alt="Couple traveling"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative w-full h-56 sm:h-64 rounded-[2rem] overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=500&q=80"
                alt="Team working in office"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Grid Column 2 */}
          <div className="flex flex-col gap-3 sm:gap-4 -translate-y-4 sm:-translate-y-8">
            <div className="relative w-full h-32 sm:h-40 rounded-[2rem] overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=500&q=80"
                alt="Heritage pool stay"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative w-full h-48 sm:h-56 rounded-[2rem] overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1605649487212-4dcb1b604816?auto=format&fit=crop&w=500&q=80"
                alt="Indian cultural dancers"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative w-full h-32 sm:h-40 rounded-[2rem] overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&q=80"
                alt="Taj Mahal"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Grid Column 3 */}
          <div className="flex flex-col gap-3 sm:gap-4 translate-y-8 sm:translate-y-10">
            <div className="relative w-full h-56 sm:h-64 rounded-[2rem] overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=500&q=80"
                alt="Team members smiling"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative w-full h-48 sm:h-56 rounded-[2rem] overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1613490908653-b1d64377bb45?auto=format&fit=crop&w=500&q=80"
                alt="Luxury villa with pool"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}