import Link from "next/link";
import Image from "next/image";


export function Footer() {
  return (
    <footer className="font-logo relative bg-neutral-900 text-brand-50 overflow-hidden min-h-[360px]">
      {/* Repeating text background */}
      <div className="absolute bottom-0 tracking-tighter left-0 right-0 flex whitespace-nowrap text-[200px] mb-[-60px] leading-none select-none text-brand-50">
        {Array(24).fill('lage').map((text, i) => (
          <span key={i} className="mx-2">{text}</span>
        ))}
      </div>

      {/* Main container (ensure this is also relative if it needs to stack above the background text explicitly) */}
      <div className="container mx-auto p-6 relative z-10">
        <div className="flex justify-between items-start">
          {/* Logo */}
          <div className="absolute top-6 right-6">
            <Image src="images/whitelogo.svg" alt="Lagels Logo" width={60} height={60} className="opacity-90" />
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

            {/* Socials Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-m text-brand-100 mb-2">Stay in touch</h3>
              <Link href="https://x.com/trylagels" className="hover:text-brand-300 text-lg">X</Link>
              <Link href="https://www.linkedin.com/company/lagels" className="hover:text-brand-300 text-lg">Linkedin</Link>
            </div>

            {/* What we do best Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-m text-brand-100 mb-2">Lagel&apos;s Legals</h3>
              <Link href="/terms" className="hover:text-brand-300 text-lg">Terms and conditions</Link>
              <Link href="/privacy" className="hover:text-brand-300 text-lg">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}