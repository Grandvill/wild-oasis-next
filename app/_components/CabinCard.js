import Image from 'next/image';
import { UsersIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="border border-primary-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Container - Full Width */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-108">
        <Image src={image || '/placeholder.svg'} fill alt={`Cabin ${name}`} className="object-cover w-full h-full" sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw" />
      </div>

      {/* Content Section - Below Image */}
      <div className="p-4 sm:p-5 md:p-6 bg-primary-950">
        <h3 className="text-accent-500 font-semibold text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-2 sm:mb-3">Cabin {name}</h3>

        <div className="flex gap-2 items-center mb-2 sm:mb-3">
          <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
          <p className="text-base sm:text-lg md:text-xl text-primary-200">
            For up to <span className="font-bold">{maxCapacity}</span> guests
          </p>
        </div>

        <p className="flex gap-2 justify-end items-baseline mb-4 sm:mb-6">
          {discount > 0 ? (
            <>
              <span className="text-2xl sm:text-3xl md:text-4xl font-[350]">${regularPrice - discount}</span>
              <span className="line-through font-semibold text-primary-600">${regularPrice}</span>
            </>
          ) : (
            <span className="text-2xl sm:text-3xl md:text-4xl font-[350]">${regularPrice}</span>
          )}
          <span className="text-primary-200 text-sm sm:text-base md:text-lg">/ night</span>
        </p>

        <div className="text-right">
          <Link href={`/cabins/${id}`} className="border-l border-primary-800 py-2 sm:py-3 px-4 sm:px-5 md:py-3 md:px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900 text-sm sm:text-base md:text-lg">
            Details & reservation →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
