import { motion } from "framer-motion";
import Hero from "@assets/landingPage/hero1.png";
import Header from "@components/navbar/Header.jsx";
import AboutCard from "@components/landingPage/AboutCard.jsx";
import Footer from "@components/footer/Footer.jsx";
import FullHeightImageText from "@components/landingPage/FullHeightImageText.jsx";
import BlogSection from "@components/landingPage/BlogSection.jsx";
import DualSideCardRightImage from "@components/landingPage/DualSideCardRightImage";
import Partnership from "@components/landingPage/Partnership";
import HeroHolder from "@components/landingPage/HeroHolder.jsx";
import "./landingPageStyles.css";

const heroStyle = {
    
    
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "90vh",
};

const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function LandingPage() {
    return (
      <>
        <div className="sticky top-0 z-20 ">
          <Header />
        </div>
        <div style={heroStyle}>
          <div className="flex w-full justify-between h-dvh mt-[-5%] ">
            <HeroHolder />
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          className="lg:px-28 px-10 about-section"
        >
          <AboutCard />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          className="md:mt-80"
        >
          <DualSideCardRightImage />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          className="mb-14"
        >
          <BlogSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          className="mb-16"
        >
          <FullHeightImageText />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          className="px-48 hidden lg:block"
        >
          <Partnership />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
        >
          <Footer />
        </motion.div>
      </>
    );
}

export default LandingPage;
