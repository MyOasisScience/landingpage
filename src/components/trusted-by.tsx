import Image from "next/image";

const logos = [
  {
    name: "Imperial College London",
    src: "/images/Imperial_College_London_new_logo.png",
    alt: "Imperial College London logo",
  },
  {
    name: "SeedLegals",
    src: "/images/seedlegals_1688985548.svg", 
    alt: "SeedLegals logo",
  },
  {
    name: "UCL",
    src: "/images/UCL_logo.png", 
    alt: "UCL logo",
  },
  {
    name: "Trafigura",
    src: "/images/Trafigura_company_logo.png", 
    alt: "Trafigura logo",
  },
  {
    name: "Revalue",
    src: "/images/Revalue_Nature_logo.png", 
    alt: "Revalue logo",
  },
];

export default function TrustedBy() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16 flex flex-col items-center gap-10">
      {/* Heading */}
      <h3 className="text-lg md:text-2xl font-medium text-neutral-700 mb-2 text-center">
        Advising innovation teams at:
      </h3>

      {/* Logo Bar */}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 w-full py-4">
        {logos.map((logo) => (
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

      {/* Testimonial */}
      <figure className="max-w-2xl mx-auto text-center bg-neutral-50 border border-neutral-200 rounded-xl p-6 md:p-8 shadow-sm">
        <blockquote className="text-neutral-800 text-base md:text-lg italic mb-4">
          "I need to stay ahead of not just cutting-edge research, but also the industry methods that are becoming best practice, like scientific approaches with 1,000+ citations. This kind of custom report gives me confidence I'm not missing anything, and means I don't have to rely on my network or socials to stay ahead."
        </blockquote>
        <figcaption className="text-neutral-600 text-sm md:text-base font-medium flex items-center justify-center gap-2">
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
              width={40}
              height={40}
              className="rounded-full object-cover border border-neutral-200"
            />
            Mohan Smith <span className="text-neutral-400 font-normal">– Statistics Lead @ Revalue</span>
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
