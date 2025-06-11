import Image from "next/image";


export function Footer() {
  return (
    <footer className="font-logo relative bg-[#1B4D3E] text-brand-50 overflow-hidden min-h-[200px]">
      {/* Repeating text background */}
      <div className="absolute bottom-0 tracking-tighter left-0 right-0 flex whitespace-nowrap text-[150px] mb-[-40px] leading-none select-none text-brand-50">
        {Array(24).fill('Oasis').map((text, i) => (
          <span key={i} className="mx-2">{text}</span>
        ))}
      </div>

      {/* Main container (ensure this is also relative if it needs to stack above the background text explicitly) */}
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex justify-between items-start">
          {/* Logo */}
          <div className="absolute top-4 right-4">
            <Image src="/images/whitelogo.png" alt="Oasis Logo" width={50} height={50} className="opacity-90" />
          </div>

          {/* Three column layout */}
          <div className="flex gap-12">
            {/* Sections Column */}
            {/* <div className="flex flex-col gap-4">
              <h3 className="text-m text-brand-300 mb-2">Sections</h3>
              <Link href="/products" className="hover:text-brand-300 text-lg">Products</Link>
              <Link href="/team" className="hover:text-brand-300 text-lg">Team</Link>
              <Link href="/mission" className="hover:text-brand-300 text-lg">Mission</Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}