import AghyadB from "../../assets/AghyadB.svg";
import AghyadL from "../../assets/AghyadL.svg";

import { useLanguage } from "../../Context/LanguageContext";

export default function AboutLeft() {
  const { lang } = useLanguage();
  const isArabic = lang === "ar";

  const imageDirection = isArabic ? "" : "scale-x-[-1]";

  return (
    <div className="w-full flex justify-center items-center">
      {/* Light Mode Image */}
      <img
        src={AghyadL}
        alt="Aghyad Alwarea"
        className={`block dark:hidden w-full max-w-[420px] lg:max-w-[480px] h-auto object-contain ${imageDirection}`}
      />

      {/* Dark Mode Image */}
      <img
        src={AghyadB}
        alt="Aghyad Alwarea"
        className={`hidden dark:block w-full max-w-[420px] lg:max-w-[480px] h-auto object-contain ${imageDirection}`}
      />
    </div>
  );
}