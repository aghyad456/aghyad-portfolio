
import { useState, useEffect } from "react";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";

import { MdLanguage } from "react-icons/md";
import { LuSunMoon } from "react-icons/lu";
import { TiWeatherSunny } from "react-icons/ti";

import { useLanguage } from "../../Context/LanguageContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { lang, toggleLang } = useLanguage();

  /* Toggle Dark Mode */
  const toggleTheme = () => {
    const newTheme = !isDarkMode;

    setIsDarkMode(newTheme);

    document.documentElement.classList.toggle("dark", newTheme);
  };

  /* Menu Items */
  const menuItems =
    lang === "en"
      ? [
          { label: "Home", id: "home" },
          { label: "About", id: "about" },
          { label: "Skills", id: "skills" },
          { label: "Projects", id: "projects" },
          { label: "Contact", id: "contact" },
        ]
      : [
          { label: "الرئيسية", id: "home" },
          { label: "نبذة عني", id: "about" },
          { label: "المهارات", id: "skills" },
          { label: "المشاريع", id: "projects" },
          { label: "تواصل معي", id: "contact" },
        ];

  /* Active Section on Scroll */
  useEffect(() => {
    const updateActiveSection = () => {
      const sections = menuItems
        .map((item, index) => {
          const element = document.getElementById(item.id);

          if (!element) return null;

          return {
            index,
            top: element.offsetTop,
          };
        })
        .filter(Boolean);

      const scrollPosition = window.scrollY + 150;

      let currentIndex = 0;

      sections.forEach((section) => {
        if (scrollPosition >= section.top) {
          currentIndex = section.index;
        }
      });

      // Activate the last section when reaching the bottom
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5
      ) {
        currentIndex = sections.length - 1;
      }

      setActiveIndex(currentIndex);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [lang]);

  return (
    <HeroNavbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-surface border-b border-border transition-colors duration-250"
    >
      {/* Brand */}
      <NavbarContent>
        <NavbarBrand>
          <p className="font-space font-bold text-text-main text-lg">
            Aghyad<span className="text-accent">.dev</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent
        className="hidden sm:flex gap-4 uppercase"
        justify="center"
      >
        {menuItems.map((item, index) => (
          <NavbarItem key={item.id}>
            <Link
              href={`#${item.id}`}
              size="lg"
              onClick={() => setActiveIndex(index)}
              className={`w-full font-medium transition-colors ${
                activeIndex === index
                  ? "text-accent font-bold"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Language & Theme */}
      <NavbarContent
        justify="end"
        className="gap-3 text-text-main"
      >
        <button
          type="button"
          onClick={toggleLang}
          aria-label="Change language"
          className="flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-80"
        >
          <span className="text-sm font-semibold">
            {lang === "en" ? "En" : "Ar"}
          </span>

          <MdLanguage className="text-xl" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex cursor-pointer items-center text-xl transition-opacity hover:opacity-80"
        >
          {isDarkMode ? (
            <LuSunMoon className="text-amber-500" />
          ) : (
            <TiWeatherSunny className="text-amber-400" />
          )}
        </button>
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent
        justify="end"
        className="sm:hidden text-text-main"
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-surface pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.id}>
            <Link
              href={`#${item.id}`}
              size="lg"
              onClick={() => {
                setActiveIndex(index);
                setIsMenuOpen(false);
              }}
              className={`w-full font-semibold transition-colors ${
                activeIndex === index
                  ? "text-accent font-bold"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
}
