import Link from 'next/link';
import Image from 'next/image';
import bg from '@/public/home.jpg';

export default function Page() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image src={bg || '/placeholder.svg'} fill placeholder="blur" quality={80} className="object-cover object-center" alt="Mountains and forests with two cabins" priority sizes="100vw" />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20 sm:pt-24">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-4 sm:mb-6 lg:mb-8 tracking-tight leading-tight">
          Welcome to <span className="block sm:inline bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent font-normal">paradise.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto font-light leading-relaxed">Discover luxury cabins nestled in nature's most breathtaking locations</p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            href="/cabins"
            className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-gray-900 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-out hover:from-amber-300 hover:to-yellow-400 w-full sm:w-auto max-w-[280px]"
          >
            <span className="relative z-10">Explore luxury cabins</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-white border-2 border-white/30 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:border-white/50 transition-all duration-300 w-full sm:w-auto max-w-[280px]"
          >
            Learn more
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <div className="flex flex-col items-center text-white/70 animate-bounce">
            <span className="text-sm mb-2 font-light">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}
