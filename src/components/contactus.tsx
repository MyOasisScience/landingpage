"use client";

export default function ContactUs() {
  return (
    <div className="w-full">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sm text-gray-800 leading-relaxed">
          Any questions please feel free to reach out on{" "}
          <a 
            href="mailto:hello@bref.science"
            className="text-gray-900 hover:text-gray-700 underline decoration-[#C6FF00] hover:decoration-[#B2E600] transition-colors"
          >
            hello@bref.science
          </a>
        </p>
      </div>
    </div>
  );
}
