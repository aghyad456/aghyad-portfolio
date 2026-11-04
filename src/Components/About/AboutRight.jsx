import { useLanguage } from "../../Context/LanguageContext";

export default function AboutRight() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full"
    >
      {/* Section Label */}
      <span
        className={`inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-3 ${
          isArabic ? "font-ibm" : "font-oxanium"
        }`}
      >
        {isArabic ? "تعرف عليّ" : "GET TO KNOW ME"}
      </span>

      {/* Title */}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main mb-6 ${
          isArabic ? "font-ibm" : "font-space"
        }`}
      >
        {isArabic ? (
          <>
            مطوّر{" "}
            <span className="text-accent">
              واجهات أمامية
            </span>
          </>
        ) : (
          <>
            Front-End{" "}
            <span className="text-accent">
              Developer
            </span>
          </>
        )}
      </h2>

      {/* Description */}
      <div
        className={`space-y-4 text-text-muted text-sm sm:text-base leading-8 ${
          isArabic ? "font-ibm" : "font-inter"
        }`}
      >
        {isArabic ? (
          <>
            <p>
              أنا مطوّر واجهات أمامية، أستمتع بتحويل الأفكار والتصاميم إلى
              تجارب ويب متكاملة وتفاعلية بتفاصيل متقنة. أركز على بناء واجهات
              متجاوبة، مع الاهتمام بدقة التفاصيل وسهولة الاستخدام والأداء.
            </p>

            <p>
              أهتم بكتابة أكواد نظيفة ومنظمة وقابلة للصيانة، وبناء مكونات
              قابلة لإعادة الاستخدام، وإنشاء تفاعلات سلسة تجعل التطبيقات
              سهلة الاستخدام وممتعة للمستخدم. كما أستمتع باستكشاف التقنيات
              الجديدة، والتعرّف على أساليب مختلفة في التطوير، وتحدي نفسي
              باستمرار لتطوير مهاراتي كمطوّر.
            </p>

            <p>
              بالنسبة إليّ، تطوير الواجهات الأمامية لا يقتصر على جعل
              المواقع جميلة بصرياً، بل يتمحور حول الجمع بين التصميم
              والوظائف وتجربة المستخدم في تجربة رقمية متكاملة.
            </p>
          </>
        ) : (
          <>
            <p>
              I'm a Front-End Developer who enjoys turning ideas and
              designs into polished, interactive web experiences. I focus
              on building responsive interfaces with attention to detail,
              usability, and performance.
            </p>

            <p>
              I care about writing clean, well-structured, and maintainable
              code, building reusable components, and creating smooth
              interactions that make applications feel intuitive and
              enjoyable to use. I also enjoy exploring new technologies,
              learning different approaches, and challenging myself to
              grow as a developer.
            </p>

            <p>
              For me, front-end development is more than making things look
              good — it's about bringing design, functionality, and user
              experience together.
            </p>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-border my-7" />

      {/* Education */}
      <div className="mb-6">
        <h3
          className={`text-lg font-bold text-text-main mb-3 ${
            isArabic ? "font-ibm" : "font-space"
          }`}
        >
          {isArabic ? "التعليم" : "Education"}
        </h3>

        <h4
          className={`text-base font-semibold text-accent mb-1 ${
            isArabic ? "font-ibm" : "font-inter"
          }`}
        >
          {isArabic
            ? "الجامعة الافتراضية السورية (SVU)"
            : "Syrian Virtual University (SVU)"}
        </h4>

        <p
          className={`text-sm text-text-muted leading-7 ${
            isArabic ? "font-ibm" : "font-inter"
          }`}
        >
          {isArabic
            ? "بكالوريوس هندسة تكنولوجيا المعلومات"
            : "Bachelor's Degree in Information Technology Engineering"}
        </p>

        <p
          className={`text-sm text-text-muted leading-7 ${
            isArabic ? "font-ibm" : "font-inter"
          }`}
        >
          {isArabic
            ? "الاختصاص: تطوير البرمجيات"
            : "Specialization: Software Development"}
        </p>

        <p
          className={`text-sm text-text-muted leading-7 ${
            isArabic ? "font-ibm" : "font-inter"
          }`}
        >
          {isArabic
            ? "سنة التخرج: 2026"
            : "Graduation Year: 2026"}
        </p>
      </div>

      {/* Location */}
      <div>
        <h3
          className={`text-lg font-bold text-text-main mb-2 ${
            isArabic ? "font-ibm" : "font-space"
          }`}
        >
          {isArabic ? "الموقع" : "Location"}
        </h3>

        <p
          className={`text-sm text-text-muted ${
            isArabic ? "font-ibm" : "font-inter"
          }`}
        >
          Damascus, Syria
        </p>
      </div>
    </div>
  );
}