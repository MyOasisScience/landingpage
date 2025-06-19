"use client";

export default function ContactUs() {
  return (
    <section className="w-full justify-center px-4 mt-16 pb-16">
      <div className="w-full flex flex-col items-center mx-auto gap-8 max-w-4xl">
        {/* Content */}
        <div className="text-center max-w-3xl">
          <p className="text-sm text-[#444444] leading-relaxed">
            Any questions please feel free to reach out on{" "}
            <a 
              href="mailto:hello@myoasis.science"
              className="text-[#2B3D3B] hover:text-[#1A2A28] underline decoration-[#C6FF00] hover:decoration-[#B2E600] transition-colors"
            >
              hello@myoasis.science
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
