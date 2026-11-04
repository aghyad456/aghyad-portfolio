import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import { useLanguage } from "../../Context/LanguageContext";

export default function Header() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const roles = isArabic
    ? [
        "مطوّر واجهات أمامية",
        "مطوّر واجهات وتطبيقات",
        "مطوّر ويب وتطبيقات موبايل",
        "مطوّر برمجيات",
        "صانع تجارب رقمية",
      ]
    : [
        "FRONT-END DEVELOPER",
        "FRONT-END & APPLICATION DEVELOPER",
        "WEB & MOBILE DEVELOPER",
        "SOFTWARE DEVELOPER",
        "DIGITAL EXPERIENCE BUILDER",
      ];

  const [displayedRole, setDisplayedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing and deleting effect.
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayedRole.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedRole(
          currentRole.slice(0, displayedRole.length + 1)
        );
      }, 75);
    } else if (
      !isDeleting &&
      displayedRole === currentRole
    ) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1000);
    } else if (isDeleting && displayedRole.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedRole(
          displayedRole.slice(0, -1)
        );
      }, 45);
    } else if (
      isDeleting &&
      displayedRole.length === 0
    ) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex, lang]);

  // Reset typing effect when language changes.
  useEffect(() => {
    setRoleIndex(0);
    setDisplayedRole("");
    setIsDeleting(false);
  }, [lang]);

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/aghyad456",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/aghyadalwarea",
      icon: FaLinkedin,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/eng.aghyadalwarea/",
      icon: FaInstagram,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/963940476998",
      icon: FaWhatsapp,
    },
  ];

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full"
    >
      {/* Availability */}
      <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 mb-6">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>

        <span className="text-xs font-medium tracking-wider text-text-muted">
          {isArabic ? "متاح للعمل" : "AVAILABLE FOR WORK"}
        </span>
      </div>

      {/* Name */}
      <h1
        className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 ${
          isArabic ? "font-ibm" : "font-space"
        }`}
      >
        {isArabic ? (
          <>
            أنا{" "}
            <span className="text-accent">
              أغيد الورع
            </span>
          </>
        ) : (
          <>
            I'm{" "}
            <span className="text-accent">
              Aghyad Alwarea
            </span>
          </>
        )}
      </h1>

      {/* Typing roles */}
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className={`min-h-8 mb-5 text-accent font-semibold text-sm sm:text-base ${
          isArabic ? "font-ibm" : "font-oxanium"
        }`}
      >
        <span>{displayedRole}</span>
        <span className="inline-block animate-pulse ml-0.5">
          |
        </span>
      </div>

      {/* Description */}
      <p
        className={`max-w-xl text-text-muted text-base sm:text-lg leading-8 mb-8 ${
          isArabic ? "font-ibm" : "font-inter"
        }`}
      >
        {isArabic
          ? "خريج هندسة تكنولوجيا المعلومات من الجامعة الافتراضية السورية، اختصاص تطوير البرمجيات. شغوف ببناء تجارب ويب وتطبيقات حديثة ومتجاوبة وسهلة الاستخدام."
          : "An Information Technology Engineering graduate from the Syrian Virtual University, specializing in Software Development. Passionate about building modern, responsive, and user-friendly web and mobile experiences."}
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <a
          href="/Aghyad_Alwarea_CV.pdf"
          download
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-white font-medium transition-colors hover:bg-accent-hover"
        >
          {isArabic ? "تحميل السيرة الذاتية" : "Download CV"}
        </a>

        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-text-main font-medium transition-colors hover:bg-accent-soft"
        >
          {isArabic ? "تواصل معي" : "Contact Me"}
        </a>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-4">
        {socialLinks.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-all duration-300 hover:border-accent hover:bg-accent-soft hover:text-accent"
          >
            <Icon size={19} />
          </a>
        ))}
      </div>
    </div>
  );
}