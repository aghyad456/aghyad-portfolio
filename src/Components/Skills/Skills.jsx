
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import {
  LuCode,
  LuDatabase,
  LuSmartphone,
  LuWrench,
  LuMonitor,
  LuTerminal,
} from "react-icons/lu";

import { useLanguage } from "../../Context/LanguageContext";

export default function Skills() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.15,
    once: false,
  });

  const categories = [
    {
      id: "01",
      icon: LuCode,
      title: isArabic ? "تطوير الواجهات الأمامية" : "Front-End Development",
      description: isArabic
        ? "مجال عملي الأساسي والتقنيات التي أستخدمها لبناء واجهات ويب حديثة."
        : "My primary field, focused on building modern and responsive web interfaces.",
      skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React.js",
        "Next.js",
        "Bootstrap",
        "Tailwind CSS",
        "HeroUI",
        "Flexbox",
        "CSS Grid",
        "Responsive Design",
      ],
      size: "md:col-span-7",
      featured: true,
    },
    {
      id: "02",
      icon: LuWrench,
      title: isArabic ? "الأدوات وسير العمل" : "Tools & Workflow",
      description: isArabic
        ? "الأدوات التي أعتمد عليها في التطوير وإدارة المشاريع."
        : "Tools I use throughout my development workflow.",
      skills: [
        "Git",
        "GitHub",
        "Vercel",
        "GitHub Pages",
        "Figma to Code",
        "Problem Solving",
        "Debugging",
      ],
      size: "md:col-span-5",
    },
    {
      id: "03",
      icon: LuDatabase,
      title: isArabic ? "الواجهات الخلفية وقواعد البيانات" : "Back-End & Databases",
      description: isArabic
        ? "معرفة بأساسيات تطوير الخادم والتعامل مع البيانات."
        : "Knowledge of backend development and database fundamentals.",
      skills: ["Laravel", "SQL", "REST API Integration"],
      size: "md:col-span-4",
    },
    {
      id: "04",
      icon: LuTerminal,
      title: isArabic ? "لغات البرمجة" : "Programming Languages",
      description: isArabic
        ? "معرفة أساسية بلغات برمجة إضافية."
        : "Basic knowledge of additional programming languages.",
      skills: ["C# (Basic)", "C++ (Basic)"],
      size: "md:col-span-4",
    },
    {
      id: "05",
      icon: LuSmartphone,
      title: isArabic ? "تطوير تطبيقات الموبايل" : "Mobile Development",
      description: isArabic
        ? "معرفة أساسية بتطوير تطبيقات الموبايل."
        : "Basic knowledge of mobile application development.",
      skills: ["Flutter (Basic)"],
      size: "md:col-span-4",
    },
    {
      id: "06",
      icon: LuMonitor,
      title: isArabic ? "مهارات الحاسوب" : "Computer Skills",
      description: isArabic
        ? "مهارات استخدام برامج الحاسوب المكتبية."
        : "Essential computer and office productivity skills.",
      skills: [
        "Microsoft Word",
        "Microsoft Excel",
        "Microsoft PowerPoint",
        "ICDL Fundamentals",
      ],
      size: "md:col-span-12",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen overflow-x-clip bg-main flex items-center pt-24 pb-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6">

        {/* Section Heading */}
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-end mb-12"
        >
          <motion.div
            key={`skills-heading-${lang}`}
            initial={{ opacity: 0, x: isArabic ? 100 : -100 }}
            animate={{
              opacity: isInView ? 1 : 0,
              x: isInView ? 0 : isArabic ? 100 : -100,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-accent" />
              <span className="text-xs font-medium tracking-[0.25em] text-accent uppercase font-oxanium">
                {isArabic ? "المهارات التقنية" : "TECH STACK"}
              </span>
            </div>

            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-text-main ${
                isArabic ? "font-ibm" : "font-space"
              }`}
            >
              {isArabic ? (
                <>
                  مهاراتي
                  <span className="block text-accent font-normal italic">
                    وأدواتي التقنية.
                  </span>
                </>
              ) : (
                <>
                  My Skills &
                  <span className="block text-accent font-normal italic">
                    Toolkit.
                  </span>
                </>
              )}
            </h2>
          </motion.div>

          <motion.p
            key={`skills-intro-${lang}`}
            initial={{ opacity: 0, x: isArabic ? -100 : 100 }}
            animate={{
              opacity: isInView ? 1 : 0,
              x: isInView ? 0 : isArabic ? -100 : 100,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`text-text-muted text-base sm:text-lg leading-8 ${
              isArabic
                ? "font-ibm border-r-2 pr-6"
                : "font-inter border-l-2 pl-6"
            } border-accent-soft`}
          >
            {isArabic
              ? "مجموعة من التقنيات والأدوات التي أستخدمها في تطوير واجهات الويب وبناء تجارب رقمية متجاوبة، إلى جانب مهاراتي في مجالات البرمجة وقواعد البيانات."
              : "A collection of technologies and tools I use to build responsive web interfaces and digital experiences, alongside my knowledge of programming and databases."}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div
          dir="ltr"
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.article
                key={`${lang}-${category.id}`}
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.97,
                }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 35,
                  scale: isInView ? 1 : 0.97,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-surface/50 p-6 sm:p-7 transition-all duration-300 hover:border-accent/50 hover:-translate-y-1 ${category.size}`}
              >
                {/* Decorative number */}
                <span className="absolute top-5 end-6 text-xs font-oxanium tracking-widest text-text-muted/50">
                  {category.id}
                </span>

                {/* Icon */}
                <div className="flex items-center justify-center w-11 h-11 mb-5 rounded-xl border border-accent-soft text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3
                  className={`text-lg sm:text-xl font-semibold text-text-main mb-2 ${
                    isArabic ? "font-ibm" : "font-space"
                  }`}
                >
                  {category.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm text-text-muted leading-7 mb-5 ${
                    isArabic ? "font-ibm" : "font-inter"
                  }`}
                >
                  {category.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center rounded-md border border-border px-3 py-1.5 text-xs text-text-muted transition-all duration-300 group-hover:border-accent/30 group-hover:text-text-main ${
                        isArabic ? "font-ibm" : "font-oxanium"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Decorative accent */}
                <div className="absolute bottom-0 start-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
