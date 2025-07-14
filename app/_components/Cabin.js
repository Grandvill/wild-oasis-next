import Image from 'next/image';
import { UsersIcon, MapPinIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import TextExpander from './TextExpander';

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  return (
    <div className="border border-primary-800 rounded-lg overflow-hidden mb-6 sm:mb-8 md:mb-10">
      {/* Grid Layout: Stack on sm and below, 3fr_4fr on md and up */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[3fr_4fr] gap-4 sm:gap-6 md:gap-20 p-2 sm:p-3 md:p-4 lg:p-6">
        {/* Image Container */}
        <div className="relative aspect-[3/4] sm:aspect-[3/4] md:aspect-auto md:h-120 lg:h-128 xl:h-144">
          <Image src={image} fill className="object-cover rounded-lg sm:rounded-lg md:rounded-l-lg" alt={`Cabin ${name}`} sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center p-2 sm:p-3 md:p-6 lg:p-10">
          <h3 className="text-accent-100 font-black text-2xl sm:text-3xl md:text-5xl lg:text-7xl mb-2 sm:mb-3 md:mb-5 bg-primary-950 p-2 sm:p-3 md:p-4 md:pl-6">Cabin {name}</h3>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-300 mb-4 sm:mb-6 md:mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-7">
            <li className="flex gap-2 sm:gap-3 md:gap-3 items-center">
              <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 text-primary-600" />
              <span className="text-sm sm:text-base md:text-lg">
                For up to <span className="font-bold">{maxCapacity}</span> guests
              </span>
            </li>
            <li className="flex gap-2 sm:gap-3 md:gap-3 items-center">
              <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 text-primary-600" />
              <span className="text-sm sm:text-base md:text-lg">
                Located in the heart of the <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-2 sm:gap-3 md:gap-3 items-center">
              <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 text-primary-600" />
              <span className="text-sm sm:text-base md:text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cabin;
