import Image from "next/image";
import LicensePurchase from '@/components/LicensePurchase';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[#035183] text-white py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full shadow-lg flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto">
                <Image
                  src="/logoIcon.svg"
                  alt="FirstWork Icon Logo"
                  width={120}
                  height={120}
                  className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 px-2">
              DTT Fully Digitized<br/>
              Streamline your ABA practice with digital DTT—efficient, secure, and designed for professionals.
            </p>
            <div className="flex justify-center space-x-2 sm:space-x-4">
              <a
                href="#pricing"
                className="bg-[#6FCEF4] text-[#035183] px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all text-sm sm:text-base"
              >
                Buy Licenses Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#035183]">
              Transform Your ABA Practice
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-[#035183]">Research Backed DTT</h3>
                <p className="text-gray-600">
                  Built on proven ABA principles, ensuring effective learning outcomes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-[#035183]">App Restriction</h3>
                <p className="text-gray-600">
                  Motivate learning by controlling access to entertainment apps until tasks are completed.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-[#035183]">Customize Lessons</h3>
                <p className="text-gray-600">
                  Tailor digital lessons to meet individual learning needs and goals.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-[#035183]">Track Data</h3>
                <p className="text-gray-600">
                  Automated data collection and progress tracking for better outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#035183]">
              Simple, Transparent Pricing
            </h2>
            <LicensePurchase />
            {/* Pricing Chart */}
            <div className="flex justify-center mt-8">
              <div className="w-full max-w-2xl">
                <h3 className="text-xl font-bold text-center mb-4 text-[#035183]">Pricing Tiers</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow text-left">
                    <thead>
                      <tr>
                        <th className="py-3 px-4 border-b text-[#035183] font-bold">Tier</th>
                        <th className="py-3 px-4 border-b text-[#035183] font-bold">Licenses</th>
                        <th className="py-3 px-4 border-b text-[#035183] font-bold">Price per License</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b text-gray-800 font-semibold">Personal</td>
                        <td className="py-2 px-4 border-b text-gray-800">1-9</td>
                        <td className="py-2 px-4 border-b text-gray-800">$10.00</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="py-2 px-4 border-b text-[#6FCEF4] font-semibold">Team</td>
                        <td className="py-2 px-4 border-b text-[#6FCEF4]">10-49</td>
                        <td className="py-2 px-4 border-b text-[#6FCEF4]">$8.00</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-[#16a34a] font-semibold">Organizational</td>
                        <td className="py-2 px-4 text-[#16a34a]">50+</td>
                        <td className="py-2 px-4 text-[#16a34a]">$6.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Image
                src="/logo.png"
                alt="FirstWork Logo"
                width={180}
                height={180}
                className="mx-auto w-36 h-36 md:w-44 md:h-44 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#035183]">
              Trusted by ABA Professionals
            </h2>
            <p className="text-gray-600 mb-8">
              Join the growing community of BCBAs and ABA professionals who trust FirstWork for their digital DTT needs.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#035183] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="mb-4">© 2024 FirstWork. All rights reserved.</p>
            <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 text-sm">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="mailto:junktms@gmail.com" className="hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
