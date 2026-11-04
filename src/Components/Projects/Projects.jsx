
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiMonitor,
  FiCode,
  FiLayers,
  FiImage,
  FiArrowUpRight,
} from "react-icons/fi";

import { useLanguage } from "../../Context/LanguageContext";

import KajoLogo from "../../assets/KajoLogo.svg";
import AteeqLogo from "../../assets/AteeqLogo.svg";

const projectLinks = {
  kajo: "https://6ae52059c67d367db28b2176--kajo-app.netlify.app/",
  ateeq: "https://papaya-salmiakki-4a6586.netlify.app/",
};

function ScreenshotPlaceholder({ label }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-border bg-main px-4 text-center">
      <div className="flex flex-col items-center gap-3 text-text-muted">
        <FiImage size={30} />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose, isArabic }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const isLastSlide = activeSlide === project.slides.length - 1;

  const nextSlide = () => {
    setActiveSlide((prev) => Math.min(prev + 1, project.slides.length - 1));
  };

  const previousSlide = () => {
    setActiveSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") previousSlide();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const slideIcons = [
    <FiMonitor key="overview" />,
    <FiCode key="tech" />,
    <FiLayers key="features" />,
    <FiImage key="showcase" />,
    <FiExternalLink key="links" />,
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-md sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 25, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          window.touchStartX = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const difference =
            event.changedTouches[0].clientX - window.touchStartX;

          if (Math.abs(difference) > 70) {
            if (difference < 0) nextSlide();
            else previousSlide();
          }
        }}
        dir={isArabic ? "rtl" : "ltr"}
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <img
              src={project.logo}
              alt={project.name}
              className="h-9 w-9 object-contain"
            />
            <div>
              <h3 className="font-heading text-base font-bold text-text-main sm:text-lg">
                {project.name}
              </h3>
              <p className="text-xs text-text-muted">
                {isArabic ? "دراسة المشروع" : "Project Case Study"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={isArabic ? "إغلاق" : "Close"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition hover:bg-main hover:text-text-main"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Slide navigation */}
        <div className="flex gap-2 overflow-x-auto border-b border-border px-5 py-3 sm:px-8">
          {project.slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveSlide(index)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition sm:text-sm ${
                activeSlide === index
                  ? "bg-accent text-white"
                  : "bg-main text-text-muted hover:text-text-main"
              }`}
            >
              {slideIcons[index]}
              {slide.title}
            </button>
          ))}
        </div>

        {/* Slide content */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {project.slides[activeSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-5 py-4 sm:px-8">
          <span className="text-xs text-text-muted">
            {activeSlide + 1} / {project.slides.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={previousSlide}
              disabled={activeSlide === 0}
              aria-label={isArabic ? "السابق" : "Previous"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-main transition hover:bg-main disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isArabic ? <FiChevronRight /> : <FiChevronLeft />}
            </button>

            <button
              onClick={isLastSlide ? onClose : nextSlide}
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-hover"
            >
              {isLastSlide
                ? isArabic
                  ? "إنهاء"
                  : "Finish"
                : isArabic
                  ? "التالي"
                  : "Next"}

              {!isLastSlide &&
                (isArabic ? <FiChevronLeft /> : <FiChevronRight />)}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: "kajo",
      name: "KAJO",
      subtitle: isArabic
        ? "منصة متكاملة للعناية بالحيوانات"
        : "Integrated Animal Care Platform",
      logo: KajoLogo,
      link: projectLinks.kajo,
      slides: [
        {
          title: isArabic ? "نظرة عامة" : "Overview",
          content: (
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
                  {isArabic ? "عن المشروع" : "About the Project"}
                </p>
                <h2 className="mb-4 font-heading text-2xl font-bold text-text-main sm:text-3xl">
                  {isArabic
                    ? "منصة متكاملة لخدمات رعاية الحيوانات"
                    : "A Complete Animal Care Platform"}
                </h2>
                <p className="leading-8 text-text-muted">
                  {isArabic
                    ? "KAJO منصة تجمع خدمات رعاية الحيوانات ضمن مكان واحد، وتربط المستخدمين بالأطباء البيطريين والمتاجر والملاجئ. توفر المنصة إمكانية حجز المواعيد، شراء المنتجات، تبنّي الحيوانات، التبرع، ومشاركة الحالات والمنشورات ضمن مجتمع تفاعلي."
                    : "KAJO is an integrated platform that brings animal care services together in one place. It connects users with veterinarians, pet shops, and shelters, offering appointment booking, product shopping, adoption, donations, and an interactive community."}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-main p-5">
                <p className="mb-2 text-sm font-semibold text-accent">
                  {isArabic ? "دوري في المشروع" : "My Role"}
                </p>
                <p className="leading-7 text-text-main">
                  {isArabic
                    ? "كنت مسؤولاً عن تطوير واجهة المستخدم الأمامية (Frontend) بالكامل، بما يشمل بناء الواجهات وتجربة المستخدم والصفحات ولوحات التحكم الخاصة بالأدوار المختلفة."
                    : "I was responsible for the entire Front-End development, including building the user interfaces, user experience, pages, and role-based dashboards."}
                </p>
              </div>

              <ScreenshotPlaceholder
                label={
                  isArabic
                    ? "صورة الصفحة الرئيسية - ستُضاف لاحقاً"
                    : "Homepage screenshot – to be added"
                }
              />
            </div>
          ),
        },
        {
          title: isArabic ? "التقنيات" : "Technologies",
          content: (
            <div className="space-y-5">
              <h2 className="font-heading text-2xl font-bold text-text-main">
                {isArabic ? "التقنيات والأدوات" : "Technologies & Tools"}
              </h2>
              <p className="text-text-muted">
                {isArabic
                  ? "التقنيات المستخدمة في تطوير واجهة المشروع."
                  : "The technologies used to build the project interface."}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  "React.js",
                  "JavaScript",
                  "Tailwind CSS",
                  "React Context API",
                  "React Router",
                  "REST API Integration",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="flex min-h-20 items-center justify-center rounded-2xl border border-border bg-main p-4 text-center text-sm font-semibold text-text-main transition hover:border-accent"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          title: isArabic ? "الميزات" : "Features",
          content: (
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-text-main">
                {isArabic ? "أبرز ميزات المنصة" : "Key Platform Features"}
              </h2>

              {[
                {
                  title: isArabic ? "حجز المواعيد الطبية" : "Veterinary Booking",
                  description: isArabic
                    ? "تصفح العيادات والأطباء واختيار الطبيب المناسب وحجز المواعيد."
                    : "Browse clinics and veterinarians, view doctor details, and book appointments.",
                },
                {
                  title: isArabic ? "المتاجر والمنتجات" : "Pet Shops & Products",
                  description: isArabic
                    ? "تصفح المنتجات وشراؤها مع لوحة تحكم خاصة بأصحاب المتاجر لإدارة المنتجات والمخزون والأسعار."
                    : "Browse and purchase products, with dedicated shop-owner dashboards for managing products, inventory, and prices.",
                },
                {
                  title: isArabic ? "التبنّي والملاجئ" : "Adoption & Shelters",
                  description: isArabic
                    ? "استعراض الحيوانات المتاحة للتبنّي وإرسال طلبات التبنّي والتبرع والإبلاغ عن الحيوانات التي تحتاج إلى رعاية."
                    : "Explore animals available for adoption, submit adoption and donation requests, and report animals in need.",
                },
                {
                  title: isArabic ? "المجتمع التفاعلي" : "Community Feed",
                  description: isArabic
                    ? "مساحة تفاعلية لمشاركة المنشورات المتعلقة بالحيوانات والحالات المفقودة والبيع والشراء."
                    : "An interactive space for sharing animal-related posts, missing pet reports, and buying or selling announcements.",
                },
                {
                  title: isArabic ? "لوحات تحكم متعددة" : "Role-Based Dashboards",
                  description: isArabic
                    ? "واجهات ولوحات تحكم مخصصة للمستخدمين والأطباء وأصحاب المتاجر والملاجئ، بالإضافة إلى لوحة الإدارة."
                    : "Dedicated dashboards for users, veterinarians, shop owners, and shelter owners, alongside a comprehensive admin dashboard.",
                },
              ].map((feature, index) => (
                <div key={feature.title} className="space-y-3">
                  <div>
                    <h3 className="mb-2 font-semibold text-text-main">
                      {index + 1}. {feature.title}
                    </h3>
                    <p className="leading-7 text-text-muted">
                      {feature.description}
                    </p>
                  </div>
                  <ScreenshotPlaceholder
                    label={
                      isArabic
                        ? "صورة الميزة - ستُضاف لاحقاً"
                        : "Feature screenshot – to be added"
                    }
                  />
                </div>
              ))}
            </div>
          ),
        },
        {
          title: isArabic ? "عرض الواجهات" : "UI Showcase",
          content: (
            <div className="space-y-5">
              <h2 className="font-heading text-2xl font-bold text-text-main">
                {isArabic ? "واجهات المستخدم" : "User Interface Showcase"}
              </h2>
              <p className="leading-7 text-text-muted">
                {isArabic
                  ? "مجموعة من واجهات المشروع بمختلف الصفحات والأحجام، مع إمكانية عرض الوضع الفاتح والداكن."
                  : "A collection of project screens across different pages and screen sizes, including Light and Dark modes."}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <ScreenshotPlaceholder
                    label={isArabic ? "Light Mode" : "Light Mode"}
                  />
                  <p className="text-center text-sm text-text-muted">
                    Light Mode
                  </p>
                </div>
                <div className="space-y-2">
                  <ScreenshotPlaceholder
                    label={isArabic ? "Dark Mode" : "Dark Mode"}
                  />
                  <p className="text-center text-sm text-text-muted">
                    Dark Mode
                  </p>
                </div>
              </div>

              <ScreenshotPlaceholder
                label={
                  isArabic
                    ? "واجهات الهاتف المحمول - ستُضاف لاحقاً"
                    : "Mobile screens – to be added"
                }
              />
            </div>
          ),
        },
        {
          title: isArabic ? "الروابط" : "Links",
          content: (
            <div className="flex min-h-64 flex-col items-center justify-center gap-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-main text-accent">
                <FiExternalLink size={28} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-main">
                {isArabic ? "جرّب المشروع" : "Explore the Project"}
              </h2>
              <p className="max-w-md leading-7 text-text-muted">
                {isArabic
                  ? "يمكنك زيارة النسخة المنشورة من منصة KAJO واستكشاف واجهاتها."
                  : "Visit the deployed version of KAJO and explore its user interface."}
              </p>
              <a
                href={projectLinks.kajo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition hover:bg-accent-hover"
              >
                {isArabic ? "زيارة الموقع" : "Live Demo"}
                <FiArrowUpRight />
              </a>
            </div>
          ),
        },
      ],
    },

    {
      id: "ateeq",
      name: "Ateeq Backdrops",
      subtitle: isArabic
        ? "منصة إلكترونية لخلفيات التصوير"
        : "Photography Backdrops Platform",
      logo: AteeqLogo,
      link: projectLinks.ateeq,
      slides: [
        {
          title: isArabic ? "نظرة عامة" : "Overview",
          content: (
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
                  {isArabic ? "عن المشروع" : "About the Project"}
                </p>
                <h2 className="mb-4 font-heading text-2xl font-bold text-text-main sm:text-3xl">
                  {isArabic
                    ? "منصة متكاملة لخلفيات التصوير"
                    : "A Photography Backdrops Platform"}
                </h2>
                <p className="leading-8 text-text-muted">
                  {isArabic
                    ? "منصة إلكترونية تتيح للمستخدمين استعراض خلفيات التصوير واختيار التصاميم المناسبة، وتجربتها باستخدام الذكاء الاصطناعي، أو إنشاء تصاميم مخصصة من خلال كتابة وصف للفكرة وتطويرها بشكل تفاعلي قبل إتمام الطلب."
                    : "An e-commerce platform that allows users to explore photography backdrops, preview selected designs using AI, or create custom designs through prompts and iterative refinement before placing an order."}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-main p-5">
                <p className="mb-2 text-sm font-semibold text-accent">
                  {isArabic ? "دوري في المشروع" : "My Role"}
                </p>
                <p className="leading-7 text-text-main">
                  {isArabic
                    ? "تطوير واجهات المستخدم الأمامية والتجارب التفاعلية، وربط الواجهات بخدمات الـBackend بالتعاون مع مطور الباك إند."
                    : "Developed the front-end interfaces and interactive experiences, and integrated them with backend services in collaboration with a Back-End Developer."}
                </p>
              </div>

              <ScreenshotPlaceholder
                label={
                  isArabic
                    ? "صورة الصفحة الرئيسية - ستُضاف لاحقاً"
                    : "Homepage screenshot – to be added"
                }
              />
            </div>
          ),
        },
        {
          title: isArabic ? "التقنيات" : "Technologies",
          content: (
            <div className="space-y-5">
              <h2 className="font-heading text-2xl font-bold text-text-main">
                {isArabic ? "التقنيات والأدوات" : "Technologies & Tools"}
              </h2>
              <p className="text-text-muted">
                {isArabic
                  ? "الأدوات والمكتبات المستخدمة في بناء الواجهات وتجربة المستخدم."
                  : "Tools and libraries used to build the interfaces and user experience."}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  "React.js",
                  "JavaScript",
                  "Tailwind CSS",
                  "HeroUI",
                  "Framer Motion",
                  "React Router",
                  "Axios",
                  "React Context API",
                  "React Hook Form",
                  "Zod",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="flex min-h-20 items-center justify-center rounded-2xl border border-border bg-main p-4 text-center text-sm font-semibold text-text-main transition hover:border-accent"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          title: isArabic ? "الميزات" : "Features",
          content: (
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-text-main">
                {isArabic ? "أبرز ميزات المنصة" : "Key Platform Features"}
              </h2>

              {[
                {
                  title: isArabic
                    ? "استعراض خلفيات التصوير"
                    : "Backdrop Browsing",
                  description: isArabic
                    ? "استعراض المنتجات والخلفيات واختيار التصميم المناسب والانتقال إلى صفحة التفاصيل."
                    : "Browse available backdrops, choose a design, and explore its details.",
                },
                {
                  title: isArabic
                    ? "التجربة والتخصيص بالذكاء الاصطناعي"
                    : "AI-Powered Customization",
                  description: isArabic
                    ? "تجربة المنتج على خلفية مختارة، أو كتابة وصف لتصميم جديد وتعديله بشكل تفاعلي حتى الوصول إلى النتيجة المطلوبة."
                    : "Preview products on selected backdrops or describe a custom design and refine it interactively until it meets the user's expectations.",
                },
                {
                  title: isArabic ? "السلة والطلبات" : "Cart & Orders",
                  description: isArabic
                    ? "إدارة المنتجات المحجوزة وإتمام الطلبات ومتابعة حالة الطلب."
                    : "Manage reserved products, place orders, and track order status.",
                },
                {
                  title: isArabic ? "الملف الشخصي" : "User Profile",
                  description: isArabic
                    ? "إدارة البيانات الشخصية ومراجعة الطلبات والحجوزات والطلبات التي تم تسليمها وإضافة التقييمات."
                    : "Manage personal information, review bookings and delivered orders, and submit feedback.",
                },
                {
                  title: isArabic ? "لوحة الإدارة" : "Admin Dashboard",
                  description: isArabic
                    ? "إدارة المنتجات والمستخدمين والطلبات والتصاميم المولّدة بالذكاء الاصطناعي والصلاحيات والتقييمات."
                    : "Manage products, users, orders, AI-generated designs, roles, and customer feedback.",
                },
              ].map((feature, index) => (
                <div key={feature.title} className="space-y-3">
                  <div>
                    <h3 className="mb-2 font-semibold text-text-main">
                      {index + 1}. {feature.title}
                    </h3>
                    <p className="leading-7 text-text-muted">
                      {feature.description}
                    </p>
                  </div>
                  <ScreenshotPlaceholder
                    label={
                      isArabic
                        ? "صورة الميزة - ستُضاف لاحقاً"
                        : "Feature screenshot – to be added"
                    }
                  />
                </div>
              ))}
            </div>
          ),
        },
        {
          title: isArabic ? "عرض الواجهات" : "UI Showcase",
          content: (
            <div className="space-y-5">
              <h2 className="font-heading text-2xl font-bold text-text-main">
                {isArabic ? "واجهات المستخدم" : "User Interface Showcase"}
              </h2>
              <p className="leading-7 text-text-muted">
                {isArabic
                  ? "استعراض صفحات المنصة وتجربة المستخدم على مختلف أحجام الشاشات."
                  : "Explore the platform pages and user experience across different screen sizes."}
              </p>

              <ScreenshotPlaceholder
                label={
                  isArabic
                    ? "واجهات الموقع - ستُضاف لاحقاً"
                    : "Website screens – to be added"
                }
              />

              <ScreenshotPlaceholder
                label={
                  isArabic
                    ? "لوحة الإدارة - ستُضاف لاحقاً"
                    : "Admin dashboard – to be added"
                }
              />
            </div>
          ),
        },
        {
          title: isArabic ? "الروابط" : "Links",
          content: (
            <div className="flex min-h-64 flex-col items-center justify-center gap-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-main text-accent">
                <FiExternalLink size={28} />
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-main">
                {isArabic ? "جرّب المشروع" : "Explore the Project"}
              </h2>
              <p className="max-w-md leading-7 text-text-muted">
                {isArabic
                  ? "يمكنك زيارة النسخة المنشورة من موقع Ateeq Backdrops واستكشاف تجربة المستخدم."
                  : "Visit the deployed version of Ateeq Backdrops and explore the user experience."}
              </p>
              <a
                href={projectLinks.ateeq}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition hover:bg-accent-hover"
              >
                {isArabic ? "زيارة الموقع" : "Live Demo"}
                <FiArrowUpRight />
              </a>
            </div>
          ),
        },
      ],
    },
  ];

  const openProject = (project) => {
    setSelectedProject(project);
  };

  return (
    <section
      id="projects"
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-main px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            {isArabic ? "أعمالي" : "MY WORK"}
          </p>

          <h2 className="font-heading text-3xl font-bold text-text-main sm:text-4xl">
            {isArabic ? "المشاريع" : "Featured Projects"}
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-text-muted">
            {isArabic
              ? "مجموعة من المشاريع التي عملت على تطويرها، والتقنيات والتجارب التي قدمتها."
              : "A collection of projects I've worked on, showcasing the technologies and experiences I've built."}
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => openProject(project)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex min-h-36 items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-6 text-start transition-colors duration-300 hover:border-accent sm:p-8"
            >
              <div className="flex min-w-0 items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-main p-3 sm:h-20 sm:w-20">
                  <img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-bold text-text-main transition-colors group-hover:text-accent sm:text-xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text-muted">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <FiArrowUpRight size={18} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isArabic={isArabic}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
