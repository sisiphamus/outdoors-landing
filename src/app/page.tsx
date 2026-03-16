export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-earth-cream via-earth-cream to-earth-sand/30">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(139,115,85,0.03)_50%,transparent_75%)] bg-[length:60px_60px]"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-earth-brown/10 rounded-full text-sm font-medium text-earth-brown border border-earth-brown/20">
              <div className="w-2 h-2 bg-earth-brown rounded-full"></div>
              For ambitious pre-med students
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-earth-forest leading-tight tracking-tight">
              Do more with
              <span className="block text-earth-brown italic">your life</span>
            </h1>

            <p className="text-xl md:text-2xl text-earth-dark/70 max-w-2xl mx-auto leading-relaxed">
              Stop drowning in admin work. Start living your potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button className="px-8 py-4 bg-earth-forest text-earth-cream rounded-xl font-semibold hover:bg-earth-forest/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                Download Outdoors
              </button>
              <div className="text-sm text-earth-brown/60">Free • No account required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-forest mb-4">
              Pre-med is consuming your life
            </h2>
            <p className="text-xl text-earth-brown max-w-2xl mx-auto">
              You're too smart to be doing this much busy work
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="border-l-4 border-earth-brown/30 pl-6">
                <div className="text-3xl font-bold text-earth-forest mb-2">15+ hours/week</div>
                <p className="text-earth-brown">Spent on applications, scheduling, and admin tasks</p>
              </div>

              <div className="border-l-4 border-earth-brown/30 pl-6">
                <div className="text-3xl font-bold text-earth-forest mb-2">3 years</div>
                <p className="text-earth-brown">Of your life dedicated to pre-med requirements</p>
              </div>

              <div className="border-l-4 border-earth-brown/30 pl-6">
                <div className="text-3xl font-bold text-earth-forest mb-2">0 time</div>
                <p className="text-earth-brown">Left for relationships, hobbies, or spontaneous adventure</p>
              </div>
            </div>

            <div className="bg-earth-sand/40 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-semibold text-earth-forest mb-6">What you're missing:</h3>
              <div className="space-y-3 text-earth-brown">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-earth-brown rounded-full"></div>
                  <span>Deep conversations with friends</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-earth-brown rounded-full"></div>
                  <span>Learning something just for fun</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-earth-brown rounded-full"></div>
                  <span>Traveling somewhere new</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-earth-brown rounded-full"></div>
                  <span>Building something creative</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-earth-brown rounded-full"></div>
                  <span>Actually enjoying your twenties</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-earth-sand/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-forest mb-6">
              Get your time back
            </h2>
            <p className="text-xl text-earth-brown max-w-2xl mx-auto">
              Outdoors handles the tedious stuff automatically
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-earth-brown/10">
              <div className="p-2 bg-earth-sand/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-earth-brown/60 ml-4">Outdoors</div>
                </div>
              </div>
              <div className="p-8 md:p-12">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-earth-forest rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                    <div>
                      <div className="font-semibold text-earth-forest">MCAT scheduling optimized</div>
                      <div className="text-earth-brown/70 text-sm">Found 4 hours this week for focused study</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-earth-forest rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                    <div>
                      <div className="font-semibold text-earth-forest">Research applications submitted</div>
                      <div className="text-earth-brown/70 text-sm">3 labs, personalized outreach, follow-up scheduled</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-earth-forest rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                    <div>
                      <div className="font-semibold text-earth-forest">Volunteer hours organized</div>
                      <div className="text-earth-brown/70 text-sm">Clinical coordinator notified, schedule conflicts resolved</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-earth-brown/10">
                    <div className="text-earth-forest font-semibold">
                      Result: 12 hours returned to your week
                    </div>
                    <div className="text-earth-brown/70 text-sm">
                      Time to call your parents, read for pleasure, or plan that trip
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-earth-forest text-earth-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to reclaim your time?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Download Outdoors and start focusing on what actually matters.
          </p>

          <div className="space-y-6">
            <button className="px-12 py-4 bg-accent-warm text-earth-dark rounded-xl font-bold text-lg hover:bg-earth-cream transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Download for Free
            </button>

            <div className="text-earth-cream/70 text-sm">
              No account required • Works offline • Privacy focused
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
