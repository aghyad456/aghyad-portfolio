
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

import { useLanguage } from "../../Context/LanguageContext";

export default function Contact() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.15,
    once: false,
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen flex items-center pt-24 pb-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6">

        {/* Section Header */}
        <motion.div
          key={`contact-heading-${lang}`}
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 35,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-accent" />

            <span className="text-xs font-medium tracking-[0.25em] text-accent uppercase font-oxanium">
              {isArabic ? "لنبقَ على تواصل" : "GET IN TOUCH"}
            </span>
          </div>

          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-text-main ${
              isArabic ? "font-ibm" : "font-space"
            }`}
          >
            {isArabic ? (
              <>
                لنتواصل
                <span className="block text-accent font-normal italic">
                  ونبدأ شيئاً مميزاً.
                </span>
              </>
            ) : (
              <>
                Let's Work
                <span className="block text-accent font-normal italic">
                  Together.
                </span>
              </>
            )}
          </h2>
        </motion.div>

        {/* Contact Content */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          <motion.div
            key={`contact-info-${lang}`}
            initial={{
              opacity: 0,
              x: isArabic ? 100 : -100,
            }}
            animate={{
              opacity: isInView ? 1 : 0,
              x: isInView ? 0 : isArabic ? 100 : -100,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ContactInfo isArabic={isArabic} />
          </motion.div>

          <motion.div
            key={`contact-form-${lang}`}
            initial={{
              opacity: 0,
              x: isArabic ? -100 : 100,
            }}
            animate={{
              opacity: isInView ? 1 : 0,
              x: isInView ? 0 : isArabic ? -100 : 100,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ContactForm isArabic={isArabic} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
