export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero min-h-screen flex items-center justify-center text-center relative">
        {/* Floating elements - hidden on mobile */}
        <div className="floating-element hidden md:block absolute top-[15%] left-[10%] animate-float">
          MCAT prep for 3 months
        </div>
        <div className="floating-element hidden md:block absolute top-[25%] right-[8%] animate-float" style={{animationDelay: '2s'}}>
          Research lab applications
        </div>
        <div className="floating-element hidden md:block absolute bottom-[30%] left-[5%] animate-float" style={{animationDelay: '4s'}}>
          Clinical volunteer scheduling
        </div>
        <div className="floating-element hidden md:block absolute bottom-[20%] right-[10%] animate-float" style={{animationDelay: '1s'}}>
          Med school essays
        </div>

        <div className="hero-content container max-w-6xl mx-auto px-4 z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-earth-forest mb-4 sm:mb-6 md:mb-8 leading-tight">
            Do more with your life
          </h1>
          <p className="tagline text-xl sm:text-2xl md:text-3xl text-earth-brown italic max-w-2xl mx-auto mb-6 sm:mb-8">
            Stop drowning in busy work.<br />Start living your potential.
          </p>
          <p className="subtitle text-base sm:text-lg md:text-xl text-earth-dark/80 max-w-lg mx-auto mb-8 sm:mb-12">
            An AI assistant that handles the tedious stuff so you can focus on what actually matters for your future.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem py-12 sm:py-16 md:py-24 bg-earth-sand">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="section-header text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-earth-forest mb-4 sm:mb-6">
              You're too smart for this
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-earth-brown max-w-2xl mx-auto">
              Pre-med shouldn't mean sacrificing everything else you care about
            </p>
          </div>

          <div className="problem-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <div className="problem-card bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-earth-brown/15">
              <h3 className="text-xl sm:text-2xl font-bold text-earth-forest mb-4">
                Endless admin work
              </h3>
              <p className="text-earth-brown text-base sm:text-lg">
                Application deadlines, scheduling volunteer hours, organizing research notes. Your brain is meant for bigger things.
              </p>
            </div>

            <div className="problem-card bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-earth-brown/15">
              <h3 className="text-xl sm:text-2xl font-bold text-earth-forest mb-4">
                No time for relationships
              </h3>
              <p className="text-earth-brown text-base sm:text-lg">
                When did you last have a real conversation that wasn't about grades or requirements?
              </p>
            </div>

            <div className="problem-card bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-earth-brown/15">
              <h3 className="text-xl sm:text-2xl font-bold text-earth-forest mb-4">
                Missing life experiences
              </h3>
              <p className="text-earth-brown text-base sm:text-lg">
                Travel, hobbies, spontaneous adventures. You're building a resume but losing yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo py-16 sm:py-20 md:py-32 text-center">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-earth-forest mb-8 sm:mb-12">
            Your personal productivity assistant
          </h2>

          <div className="laptop-container max-w-4xl mx-auto">
            <div className="laptop-mockup border-8 sm:border-16 md:border-20 border-[#d4d0c8] bg-[#c0c0c0] rounded-xl shadow-2xl overflow-hidden aspect-video">
              <div className="laptop-screen w-full h-full bg-gradient-to-br from-sky-300 to-green-300 flex items-center justify-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-wider drop-shadow-lg">
                  Outdoors
                </h3>
              </div>
            </div>
          </div>

          <p className="mt-8 text-earth-brown italic text-lg sm:text-xl">
            Automate scheduling, organize applications, track deadlines.<br />
            Get back hours every week.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta bg-earth-forest text-earth-cream py-12 sm:py-16 md:py-20 text-center">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Ready to get your life back?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 opacity-90 max-w-2xl mx-auto">
            Download Outdoors and start focusing on what actually matters for your future.
          </p>
          <a
            href="#"
            className="download-btn inline-block bg-accent-warm text-earth-dark px-8 sm:px-12 py-4 sm:py-5 rounded-full font-semibold text-lg sm:text-xl tracking-wide transition-all duration-300 hover:bg-earth-cream hover:-translate-y-1 hover:shadow-xl"
          >
            Download Now
          </a>
        </div>
      </section>
    </main>
  );
}
