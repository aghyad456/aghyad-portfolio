
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import {
  LuArrowUpRight,
  LuMail,
  LuMapPin,
} from "react-icons/lu";

export default function ContactInfo({ isArabic }) {
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
    <div dir={isArabic ? "rtl" : "ltr"} className="w-full">

      <h3
        className={`text-2xl sm:text-3xl font-semibold text-text-main mb-4 ${
          isArabic ? "font-ibm" : "font-space"
        }`}
      >
        {isArabic
          ? "هل لديك فكرة أو مشروع؟"
          : "Have a project in mind?"}
      </h3>

      <p
        className={`text-text-muted leading-8 text-base sm:text-lg mb-10 ${
          isArabic ? "font-ibm" : "font-inter"
        }`}
      >
        {isArabic
          ? "يسعدني دائماً التعرف على أشخاص جدد ومناقشة الأفكار والمشاريع المميزة. لا تتردد بالتواصل معي، وسأكون سعيداً بالحديث معك."
          : "I'm always happy to connect with new people, discuss interesting ideas, and explore potential opportunities. Feel free to reach out — I'd love to hear from you."}
      </p>

      {/* Contact Details */}
      <div className="space-y-5 mb-10">

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-xl border border-border text-accent">
            <LuMapPin size={21} />
          </div>

          <div>
            <p className="text-xs text-text-muted mb-1">
              {isArabic ? "الموقع" : "LOCATION"}
            </p>
            <p className="text-sm font-medium text-text-main">
              Damascus, Syria
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-xl border border-border text-accent">
            <LuMail size={21} />
          </div>

          <div>
            <p className="text-xs text-text-muted mb-1">
              {isArabic ? "البريد الإلكتروني" : "EMAIL"}
            </p>
            <p className="text-sm font-medium text-text-main">
              {isArabic
                ? "يمكنك التواصل معي عبر حساباتي"
                : "Reach me through my social accounts"}
            </p>
          </div>
        </div>

      </div>

      {/* Social Links */}
      <div>
        <p className="text-xs font-medium tracking-widest text-text-muted mb-4">
          {isArabic ? "تابعني على" : "FIND ME ON"}
        </p>

        <div className="flex flex-wrap gap-3">
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              title={name}
              className="group flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-text-muted transition-all duration-300 hover:border-accent hover:bg-accent-soft hover:text-accent"
            >
              <Icon size={18} />

              <span className="text-sm font-medium">
                {name}
              </span>

              <LuArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
