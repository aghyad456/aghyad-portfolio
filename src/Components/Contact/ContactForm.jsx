
import { useState } from "react";
import { LuSend } from "react-icons/lu";

export default function ContactForm({ isArabic }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notice, setNotice] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setNotice("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNotice(
      isArabic
        ? "النموذج جاهز، لكن لم يتم ربط خدمة إرسال الرسائل بعد."
        : "The form is ready, but a message delivery service has not been connected yet."
    );
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-main px-4 py-3 text-sm text-text-main placeholder:text-text-muted/60 outline-none transition-all duration-300 focus:border-accent focus:ring-1 focus:ring-accent/30";

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="rounded-2xl border border-border bg-surface/50 p-6 sm:p-8"
    >
      <h3
        className={`text-2xl font-semibold text-text-main mb-2 ${
          isArabic ? "font-ibm" : "font-space"
        }`}
      >
        {isArabic ? "أرسل رسالة" : "Send Me a Message"}
      </h3>

      <p
        className={`text-sm text-text-muted mb-7 ${
          isArabic ? "font-ibm" : "font-inter"
        }`}
      >
        {isArabic
          ? "املأ النموذج وسنتواصل قريباً."
          : "Fill out the form and let's start a conversation."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-text-main mb-2"
          >
            {isArabic ? "الاسم" : "Your Name"}
          </label>

          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={isArabic ? "أدخل اسمك" : "Enter your name"}
            className={inputClass}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-text-main mb-2"
          >
            {isArabic ? "البريد الإلكتروني" : "Email Address"}
          </label>

          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email"}
            className={inputClass}
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-sm font-medium text-text-main mb-2"
          >
            {isArabic ? "الموضوع" : "Subject"}
          </label>

          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={isArabic ? "موضوع الرسالة" : "What's this about?"}
            className={inputClass}
            required
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-text-main mb-2"
          >
            {isArabic ? "رسالتك" : "Your Message"}
          </label>

          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={isArabic ? "اكتب رسالتك هنا..." : "Write your message here..."}
            rows={5}
            className={`${inputClass} resize-none`}
            required
          />
        </div>

        {/* Notice */}
        {notice && (
          <p
            role="status"
            className="text-sm text-accent leading-6"
          >
            {notice}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover"
        >
          {isArabic ? "إرسال الرسالة" : "Send Message"}

          <LuSend
            size={17}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>

      </form>
    </div>
  );
}
