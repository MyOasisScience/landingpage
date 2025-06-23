import Image from "next/image";

const mainLogos = [
  {
    name: "BBC News",
    src: "/images/BBC_News_2022_(Alt).png",
    alt: "BBC News logo",
  },
  {
    name: "HM Civil Service",
    src: "/images/HM_Civil_Service_logo.png",
    alt: "HM Civil Service logo",
  },
];

const secondaryLogos = [
  {
    name: "SeedLegals",
    src: "/images/seedlegals_1688985548.svg",
    alt: "SeedLegals logo",
  },
  {
    name: "Imperial College London",
    src: "/images/Imperial_College_London_new_logo.png",
    alt: "Imperial College London logo",
  },
  {
    name: "UCL",
    src: "/images/UCL_logo.png",
    alt: "UCL logo",
  },
  {
    name: "EcoAct",
    src: "/images/EcoAct-logo_Secondary_RGB_SKY.png",
    alt: "EcoAct logo",
  },
];

export default function TrustedBy() {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Heading */}
      <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-2 text-center">
        Trusted by innovation teams at:
      </h3>

      {/* Main Logo Bar */}
      <div className="flex flex-wrap justify-center items-center gap-8 w-full py-4">
        {mainLogos.map((logo) => (
          <div key={logo.name} className="flex items-center h-12 md:h-16">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={64}
              className="object-contain h-full w-auto grayscale hover:grayscale-0 transition-all duration-200"
            />
          </div>
        ))}
      </div>

      {/* Secondary Logo Bar */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 w-full py-2">
        {secondaryLogos.map((logo) => (
          <div key={logo.name} className="flex items-center h-6 md:h-8">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={60}
              height={32}
              className="object-contain h-full w-auto grayscale hover:grayscale-0 transition-all duration-200"
            />
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <figure className="max-w-2xl mx-auto text-center bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
        <blockquote className="text-gray-900 text-sm md:text-base italic mb-4">
          &quot;I need to stay ahead of not just cutting-edge research, but also the industry methods that are becoming best practice, like scientific approaches with 1,000+ citations. This kind of custom report gives me confidence I&apos;m not missing anything, and means I don&apos;t have to rely on my network or socials to stay ahead.&quot;
        </blockquote>
        <figcaption className="text-gray-700 text-xs md:text-sm font-medium flex items-center justify-center gap-2">
          <a
            href="https://www.linkedin.com/in/mohan-smith/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-700 transition-colors"
            aria-label="Mohan Smith LinkedIn"
          >
            <Image
              src="/images/Mohan_Smith.jpeg"
              alt="Mohan Smith"
              width={32}
              height={32}
              className="rounded-full object-cover border border-gray-200"
            />
            Mohan Smith <span className="text-gray-700 font-medium">– Statistics Lead @ Revalue</span>
          </a>
        </figcaption>
      </figure>
    </div>
  );
}
