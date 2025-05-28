import SideNavigation from '@/app/_components/SideNavigation';

// children berfungsi untk memasukkan konten ke dalam layout
export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem,1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
