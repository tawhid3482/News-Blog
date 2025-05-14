import Hero from "@/components/ui/HomePage/HeroSection/HeroSection";
import News from "@/components/ui/HomePage/News/News";
import Newsletter from "@/components/ui/HomePage/Newsletter/Newsletter";
import VideoNews from "@/components/ui/HomePage/VideoNews/VideoNews";
import EditorialsSection from "@/components/ui/Shared/Test";
import Test from "@/components/ui/Shared/Test";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Hero />
      <News />
      <VideoNews />
      <Newsletter></Newsletter>
      <EditorialsSection></EditorialsSection>
      {/* <Test></Test> */}
    </>
  );
};

export default HomePage;
