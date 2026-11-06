import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import Header from "./Header";
import TechOrbs from "./TechOrbs";
import { useLanguage } from "../../Context/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.25,
    once: false,
  });

  const headerDirection = isArabic ? 100 : -100;
  const orbsDirection = isArabic ? -1 : 1;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center pt-16 pb-8 bg-main"
    >
      <div className="mx-auto w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Header */}
        <motion.div
          key={`header-${lang}`}
          initial={{
            opacity: 0,
            x: headerDirection,
          }}
          animate={{
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : headerDirection,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Header />
        </motion.div>

        {/* Technology Orbs */}
        <TechOrbs
          key={`orbs-${lang}`}
          isVisible={isInView}
          direction={orbsDirection}
        />

      </div>
    </section>
  );
}