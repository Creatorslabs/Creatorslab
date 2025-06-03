import React from "react"
import Header from "../Home/components/Header"
import Hero from "../Home/components/Hero"
import CTA from "../Home/components/CTA"
import Features from "../Home/components/Features"
import Sponsor from "../Home/components/Sponsor"
import Footer from "../Home/components/Footer"
import WaitlistForm from "./comp/WaitlistForm"

const Waitlist = () => {
    return (
        <>
            <Header />
            <Hero />
            <Features />
            <WaitlistForm />
            <CTA />
            <Sponsor />
            <Footer />
        </>
    )
}

export default Waitlist;