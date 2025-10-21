"use client";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white text-xs py-3 overflow-hidden shadow-lg">
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-12 font-medium tracking-widest">
              RENT OUR LATEST ARRIVAL 13/01/2023
            </span>
            <span className="mx-12 font-medium tracking-widest">
              RENT OUR LATEST ARRIVAL 13/01/2023
            </span>
            <span className="mx-12 font-medium tracking-widest">
              RENT OUR LATEST ARRIVAL 13/01/2023
            </span>
            <span className="mx-12 font-medium tracking-widest">
              RENT OUR LATEST ARRIVAL 13/01/2023
            </span>
            <span className="mx-12 font-medium tracking-widest">
              RENT OUR LATEST ARRIVAL 13/01/2023
            </span>
            <span className="mx-12 font-medium tracking-widest">
              RENT OUR LATEST ARRIVAL 13/01/2023
            </span>
          </div>
        </div>

        <div className="relative px-4 py-6">
          <div className="w-[80%] mx-auto">
            <div className="flex items-center justify-between mb-16">
              <div className="text-center flex items-center">
                <h2 className="text-3xl font-bold tracking-[0.3em] text-black font-serif">
                  D2D
                </h2>
                <p className="text-sm text-gray-600 mt-1 tracking-widest">
                  ( DESIGNER TO DRESS )
                </p>
              </div>

              <button className="flex flex-col space-y-1.5 group">
                <div className="w-7 h-0.5 bg-black transition-all duration-300 group-hover:w-8"></div>
                <div className="w-7 h-0.5 bg-black transition-all duration-300 group-hover:w-6"></div>
                <div className="w-7 h-0.5 bg-black transition-all duration-300 group-hover:w-8"></div>
              </button>
            </div>
          </div>

          {/* Main content area */}
          <div className="relative max-w-7xl mx-auto">
            <div className="relative grid grid-cols-4 gap-6 h-[600px] mb-16">
              {/* Image 1 */}
              <div className="bg-gray-300 rounded-2xl relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                <img
                  src="/fashion-model-bw.png"
                  alt="Fashion model"
                  className="w-full h-full object-cover filter hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 text-white">
                  <p className="text-xs font-medium tracking-wider uppercase">
                    Rent Our Latest Arrival
                  </p>
                  <p className="text-xs opacity-80 mt-1">13/01/2023</p>
                </div>
              </div>

              {/* Image 2 */}
              <div className="bg-gray-300 rounded-2xl relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                <img
                  src="/artistic-fashion-photography.png"
                  alt="Fashion photography"
                  className="w-full h-full object-cover filter hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 text-white">
                  <p className="text-xs font-medium tracking-wider uppercase">
                    Get Ready To Go Back
                  </p>
                  <p className="text-xs opacity-80 mt-1">To Work</p>
                </div>
              </div>

              {/* Image 3 */}
              <div className="bg-gray-300 rounded-2xl relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                <img
                  src="/fashion-model-portrait.png"
                  alt="Portrait model"
                  className="w-full h-full object-cover filter hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 text-white">
                  <p className="text-xs font-medium tracking-wider uppercase">
                    Be The Best Dressed
                  </p>
                  <p className="text-xs opacity-80 mt-1">In The Office</p>
                </div>
              </div>

              {/* Image 4 */}
              <div className="bg-gray-300 rounded-2xl relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                <img
                  src="/tropical-fashion-lifestyle.png"
                  alt="Lifestyle fashion"
                  className="w-full h-full object-cover filter hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 text-white">
                  <p className="text-xs font-medium tracking-wider uppercase">
                    Make Outfit Now!
                  </p>
                  <p className="text-xs opacity-80 mt-1">Style Awaits</p>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-7xl md:text-9xl font-bold text-white mix-blend-difference tracking-tighter font-serif drop-shadow-2xl">
                  D2D Rental
                </h1>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>
      <div className="grid md:grid-cols-2 gap-10 relative max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-black to-gray-900 text-white p-10 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
          <h4 className="text-lg font-bold mb-6 tracking-wider">
            NEED AN OUTFIT FOR YOUR NEXT EVENT?
          </h4>
          <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full text-sm font-semibold tracking-wider shadow-lg hover:shadow-xl transition-all duration-300">
            WE'VE GOT YOU
          </Button>
        </div>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-10 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
          <h4 className="text-lg font-bold mb-6 text-black tracking-wider">
            GET READY TO GO BACK TO WORK AND BE STYLISH AGAIN THIS YEAR
          </h4>
          <Button className="bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-800 hover:to-black px-8 py-3 rounded-full text-sm font-semibold tracking-wider shadow-lg hover:shadow-xl transition-all duration-300">
            MAKE OUTFIT NOW
          </Button>
        </div>
      </div>
    </>
  );
}
