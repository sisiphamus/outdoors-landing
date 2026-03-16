import LaptopMockup from "@/components/LaptopMockup";
import WaitlistSection from "@/components/WaitlistSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="text-center px-6 pt-12 sm:pt-20 md:pt-24 pb-8 sm:pb-12">
        <p className="text-lg sm:text-xl md:text-2xl text-earth-dark/70 leading-relaxed max-w-2xl mx-auto">
          Stop doing busy work. Let technology handle the routine stuff while you focus on what actually matters.
        </p>
      </div>

      {/* Product demo */}
      <div className="flex justify-center px-4 sm:px-6 pb-8 sm:pb-16">
        <LaptopMockup />
      </div>

      {/* Waitlist section */}
      <WaitlistSection />
    </main>
  );
}
/* Force redeploy Mon Mar 16 00:11:01 EDT 2026 */
