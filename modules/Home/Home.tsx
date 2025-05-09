import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Task from "./components/Task";
import Sponsor from "./components/Sponsor";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Task />
      <CTA />
      <Sponsor />
      <Footer />
    </>
  );
}

export default Home;
