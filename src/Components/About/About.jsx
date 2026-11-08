import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import AboutLeft from "./AboutLeft";
import AboutRight from "./AboutRight";
import { useLanguage } from "../../Context/LanguageContext";

export default function About() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.25,
    once: false,
  });

  const imageDirection = isArabic ? 100 : -100;
  const contentDirection = isArabic ? -100 : 100;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-main flex items-center pt-24 pb-16 overflow-x-clip"
    >
      <div className="mx-auto w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* About Image */}
        <motion.div
          key={`about-image-${lang}`}
          initial={{
            opacity: 0,
            x: imageDirection,
          }}
          animate={{
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : imageDirection,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full flex justify-center"
        >
          <AboutLeft />
        </motion.div>

        {/* About Content */}
        <motion.div
          key={`about-content-${lang}`}
          initial={{
            opacity: 0,
            x: contentDirection,
          }}
          animate={{
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : contentDirection,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
        >
          <AboutRight />
        </motion.div>

      </div>
    </section>
  );
}