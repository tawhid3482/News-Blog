import Editorials from "@/components/ui/HomePage/Editorials/Editorials";
import Hero from "@/components/ui/HomePage/HeroSection/HeroSection";
import News from "@/components/ui/HomePage/News/News";
import Newsletter from "@/components/ui/HomePage/Newsletter/Newsletter";
import VideoNews from "@/components/ui/HomePage/VideoNews/VideoNews";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Hero />
      <News />
      <VideoNews />
      <Newsletter></Newsletter>
      <Editorials></Editorials>
      {/* <Test></Test> */}
    </>
  );
};

export default HomePage;
