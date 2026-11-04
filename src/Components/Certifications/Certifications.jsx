
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LuAward, LuDownload, LuFileText } from "react-icons/lu";
import { useLanguage } from "../../Context/LanguageContext";

const certificates = [
  {
    title: {
      en: "Front-End Web Development",
      ar: "تطوير واجهات الويب الأمامية",
    },
    issuer: "Root Academy",
    description: {
      en: "A practical training experience focused on front-end development, building responsive user interfaces, and working with modern web technologies.",
      ar: "تجربة تدريبية عملية ركزت على تطوير واجهات الويب الأمامية، وبناء واجهات متجاوبة، والتعامل مع تقنيات الويب الحديثة.",
    },
    file: "../../../public/Root Academy.pdf",
    downloadName: "Root-Academy-Certificate.pdf",
  },
  {
    title: {
      en: "One Million Prompters",
      ar: "مبادرة مليون مروّج",
    },
    issuer: "Dubai Future Foundation",
    description: {
      en: "A learning program focused on prompt engineering and developing the skills needed to interact effectively with artificial intelligence tools.",
      ar: "برنامج تعليمي يركز على هندسة الأوامر وتطوير المهارات اللازمة للتفاعل بفعالية مع أدوات الذكاء الاصطناعي.",
    },
    file: "../../../public/aghyad-alwarea-certificate.pdf",
    downloadName: "One-Million-Prompters-Certificate.pdf",
  },
];

export default function Certifications() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.2,
    once: false,
  });

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="scroll-mt-20 py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 35,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />

            <span className="font-oxanium text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              {isArabic ? "إنجازاتي" : "My Achievements"}
            </span>
          </div>

          <h2 className="font-space text-4xl font-bold text-text-main md:text-5xl">
            {isArabic ? "الشهادات" : "Certifications"}
            <span className="text-accent">.</span>
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-8 text-text-muted">
            {isArabic
              ? "مجموعة من الشهادات والبرامج التدريبية التي ساهمت في تطوير مهاراتي ومعرفتي."
              : "A collection of certificates and training programs that contributed to developing my skills and knowledge."}
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div
          dir="ltr"
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {certificates.map((certificate, index) => (
            <motion.article
              key={certificate.issuer}
              dir={isArabic ? "rtl" : "ltr"}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 40,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/50 md:p-8"
            >
              {/* Icon */}
              <div className="mb-7 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                  <LuAward size={28} />
                </div>

                <span className="font-oxanium text-sm text-text-muted">
                  0{index + 1}
                </span>
              </div>

              {/* Certificate Info */}
              <p className="mb-2 text-sm font-semibold text-accent">
                {certificate.issuer}
              </p>

              <h3 className="mb-3 text-xl font-bold text-text-main md:text-2xl">
                {certificate.title[lang]}
              </h3>

              <p className="mb-8 min-h-20 text-sm leading-7 text-text-muted">
                {certificate.description[lang]}
              </p>

              {/* Download Certificate */}
              <a
                href={certificate.file}
                download={certificate.downloadName}
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-main transition-colors duration-300 hover:text-accent"
              >
                <LuFileText size={17} />

                {isArabic ? "تحميل الشهادة" : "View Certificate"}

                <LuDownload size={17} />
              </a>

              {/* Decorative Background */}
              <div className="pointer-events-none absolute -bottom-16 -end-16 h-40 w-40 rounded-full bg-accent/5 blur-3xl transition-all duration-500 group-hover:bg-accent/10" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
