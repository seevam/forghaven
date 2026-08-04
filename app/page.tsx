"use client";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Cursor from "@/components/Cursor";
import GrainOverlay from "@/components/GrainOverlay";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import IntroBand from "@/components/IntroBand";
import BrewsScrolly from "@/components/BrewsScrolly";
import Marquee from "@/components/Marquee";
import Heritage from "@/components/Heritage";
import HorizontalProcess from "@/components/HorizontalProcess";
import TestimonialCTA from "@/components/TestimonialCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Cursor />
      <GrainOverlay />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <IntroBand />
        <BrewsScrolly />
        <Marquee />
        <Heritage />
        <HorizontalProcess />
        <TestimonialCTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
