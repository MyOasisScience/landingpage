'use client'

import React, { useState } from "react";
import { Input } from "./ui/input";

interface FormProps {
  containerClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
  buttonComponent?: React.ReactNode;
}

export default function WaitlistForm({
  containerClassName = "",
  inputClassName = "",
  buttonClassName = "",
  placeholder = "name@email.com",
  buttonComponent,
}: FormProps) {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      if (response.ok) {
        setStatus("Thanks for registering!");
        form.reset();
      } else {
        const errorData = await response.json();
        setStatus(
          errorData.message || "Oops! There was a problem submitting your form."
        );
      }
    } catch {
      setStatus("Oops! There was a problem submitting your form.");
    }
  };

  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      onSubmit={handleSubmit}
      className="contact-form"
    >
      {/* Required Hidden Fields for Web3Forms */}
      <input
        type="hidden"
        name="access_key"
        value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "27606b18-047a-410a-94c5-49a494730ed1"}
      />
      <input type="hidden" name="subject" value="Demo Request" />

      {/* Your Container, Input, and Button */}
      <div className={`flex flex-col sm:block relative gap-2 sm:gap-0 ${containerClassName}`}>
        <Input
          type="email"
          name="email"
          required
          placeholder={placeholder}
          className={`rounded-full bg-white text-lg h-12 pr-4 sm:pr-44 ${inputClassName}`}
        />
        {buttonComponent ?? (
          <div className="sm:absolute sm:right-1 sm:top-[4px]">
            <button 
              type="submit"
              className={`group relative px-8 py-2 rounded-full text-white font-medium
                       bg-[#3A86FF] hover:bg-[#2B75E5]
                       active:bg-[#1A65D4]
                       border border-[#3A86FF]/50
                       shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
                       hover:shadow-[0_6px_15px_rgba(0,0,0,0.25)] 
                       active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]
                       transition-all duration-200
                       active:translate-y-0.5 ${buttonClassName}`}
            >
              <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                Join Waitlist
              </span>
              <span
                className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5 opacity-50 
                          group-hover:opacity-80 group-active:opacity-30 rounded-full"
              ></span>
              <span
                className="absolute inset-0 border-t border-white/20 rounded-full group-active:opacity-0"
              ></span>
              <span
                className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-[#3A86FF]/50 to-[#2B75E5]/50 opacity-0 
                         group-hover:opacity-100 -z-10 group-active:opacity-0 transition-opacity"
              ></span>
            </button>
          </div>
        )}
      </div>

      {/* Status Message */}
      {status && (
        <p className="mt-4 text-center text-sm text-neutral-800">{status}</p>
      )}
    </form>
  );
}
