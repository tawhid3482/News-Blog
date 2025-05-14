import React from "react";
import Image from "next/image";
import heroImage from "@/assets/image.png";

const Hero = () => {
  return (
    <section className="relative text-white py-28 px-4 overflow-hidden my-5">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="News background"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-while/70 to-black/80"></div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-wide">
          Breaking News. Bold Perspectives.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300">
          Dive into the world of current events, expert opinions, and reliable
          journalism—all at your fingertips.
        </p>

        <a
          href="/latest"
          className="inline-block bg-white text-[#0896EF] hover:bg-gray-100 font-semibold py-3 px-6 rounded-full transition shadow-md text-lg"
        >
          Browse Top Stories
        </a>
      </div>
    </section>
  );
};

export default Hero;
