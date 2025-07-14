import CabinCard from '@/app/_components/CabinCard';
import { getCabins } from '@/app/_lib/data-service';
import { unstable_noStore as noStore } from 'next/cache';

async function CabinList({ filter }) {
  noStore(); //berfungsi untuk menghindari cache pada halaman ini (fungsi nya sama aja kayak revalidate)

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === 'all') displayedCabins = cabins;
  if (filter === 'small') displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === 'medium') displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);
  if (filter === 'large') displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
