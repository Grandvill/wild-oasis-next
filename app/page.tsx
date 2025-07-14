import Link from 'next/link';
import Image from 'next/image';
import bg from '@/public/home.jpg';
export default function Page() {
  return (
    <main className="w-full flex items-center justify-center overflow-hidden mt-24 ">
      <Image src={bg} fill placeholder="blur" quality={80} className="object-cover object-top" alt="Mountains and forests with two cabins" />

      {/* Content */}
      <div className="relative z-10 text-center bottom-6 px-2 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-7xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-light text-white mb-4 sm:mb-6 lg:mb-8 tracking-tight leading-snug">
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
        </div>
      </div>
    </main>
  );
}
