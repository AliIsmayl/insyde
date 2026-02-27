import React, { useState, useEffect, useRef } from "react";
import "./HomeAll.scss";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  ChevronDown,
  Instagram,
  Music2,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import Image from "../../image/Logo.png";
import emailjs from "@emailjs/browser";

// ─── EmailJS Config ────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_y3j406s";
const EMAILJS_TEMPLATE_ID = "template_0b2gpgl";
const EMAILJS_PUBLIC_KEY = "T9ig9N_yRfUqtx_JG";

// ─── Translations ──────────────────────────────────────────────
const TRANSLATIONS = {
  EN: {
    hero: {
      title: "Premium Digital Card",
      subtitle:
        "With the Insyde digital card, share your social media accounts, personal portfolio, and contact information with just one tap.",
    },
    how: {
      title: "How It Works",
      steps: [
        {
          id: "01",
          title: "Discover",
          description:
            "First, we analyze your needs, portfolio, and brand direction.",
        },
        {
          id: "02",
          title: "Implementation",
          description:
            "All your information is collected and structured into a clean, presentable format.",
        },
        {
          id: "03",
          title: "Delivery",
          description:
            "Your finished Insyde card is delivered to you physically in premium packaging.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "What is the Insyde card used for?",
          a: "To present your personal portfolio, brand, and contact information in a digital format in the most effective and aesthetic way.",
        },
        {
          q: "How can I get information about the card?",
          a: "You can contact us via Instagram or through the contact form below.",
        },
        {
          q: "What if I don't have a portfolio?",
          a: "After your social information is added, a personal portfolio website is created for you and integrated with your card.",
        },
        {
          q: "How does the card work?",
          a: "You can share your information by tapping your Insyde card on any NFC-enabled smartphone.",
        },
      ],
    },
    contact: {
      title: "Contact Us",
      sub: "Write to us to get your Insyde card.",
      name: "Full Name",
      email: "Email",
      msg: "Message",
      btn: "Send Message",
      sending: "Sending...",
      success: "Your message has been sent successfully!",
      error: "Something went wrong. Please try again.",
      validation: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        msg: "Please write your message.",
      },
    },
  },
  AZ: {
    hero: {
      title: "Premium Rəqəmsal Kart",
      subtitle:
        "İnsyde rəqəmsal kart ilə sosial media hesablarınızı, şəxsi portfelinizi və əlaqə məlumatlarınızı tək toxunuşla paylaşın.",
    },
    how: {
      title: "Necə İşləyir",
      steps: [
        {
          id: "01",
          title: "Kəşf et",
          description:
            "İlk olaraq sizin ehtiyaclarınızı, portfelinizi və brend yönümünüzü təhlil edirik.",
        },
        {
          id: "02",
          title: "Tətbiq",
          description:
            "Bütün məlumatlarınız toplanır və təqdimat üçün dolğun, səliqəli formata salınır.",
        },
        {
          id: "03",
          title: "Təhvil",
          description:
            "Hazır Insyde kartınız premium qablaşdırmada, fiziki olaraq sizə təqdim olunur.",
        },
      ],
    },
    faq: {
      title: "Tez-tez Verilən Suallar",
      items: [
        {
          q: "İnsyde kartı nə üçün istifadə olunur?",
          a: "Şəxsi portfelinizi, brendinizi və əlaqə məlumatlarınızı rəqəmsal formatda ən effektiv və estetik şəkildə təqdim etmək üçün.",
        },
        {
          q: "Kart haqqında necə məlumat əldə edə bilərəm?",
          a: "Instagram üzərindən və ya aşağıdakı əlaqə forması vasitəsilə bizimlə əlaqə saxlaya bilərsiniz.",
        },
        {
          q: "Portfelim yoxdursa, nə edə bilərəm?",
          a: "Sosial məlumatlarınız əlavə edildikdən sonra sizin üçün şəxsi portfel veb saytı hazırlanır və kartınıza inteqrasiya olunur.",
        },
        {
          q: "Kart necə istifadə olunur?",
          a: "İnsyde kartınızı NFC dəstəkləyən istənilən telefona yaxınlaşdıraraq məlumatlarınızı paylaşa bilərsiniz.",
        },
      ],
    },
    contact: {
      title: "Bizimlə Əlaqə",
      sub: "Insyde kartı əldə etmək üçün yazın.",
      name: "Ad, Soyad",
      email: "E-poçt",
      msg: "Mesaj",
      btn: "Mesaj Göndər",
      sending: "Göndərilir...",
      success: "Mesajınız uğurla göndərildi!",
      error: "Xəta baş verdi. Yenidən cəhd edin.",
      validation: {
        name: "Adınızı daxil edin.",
        email: "Düzgün e-poçt ünvanı daxil edin.",
        msg: "Mesajınızı yazın.",
      },
    },
  },
};

// ─── Component ────────────────────────────────────────────────
function HomeAll() {
  const [lang, setLang] = useState(
    () => localStorage.getItem("app-lang") || "AZ",
  );
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("app-theme");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [openFaq, setOpenFaq] = useState(0);

  // ── Form state ──
  const formRef = useRef();
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | loading | success | error

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    localStorage.setItem("app-lang", lang);
  }, [lang]);

  useEffect(() => {
    document.body.className = isDark ? "dark-theme" : "light-theme";
    localStorage.setItem("app-theme", JSON.stringify(isDark));
  }, [isDark]);

  // ── Validation ──
  const validate = () => {
    const errors = {};
    if (!formData.from_name.trim())
      errors.from_name = t.contact.validation.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reply_to))
      errors.reply_to = t.contact.validation.email;
    if (!formData.message.trim()) errors.message = t.contact.validation.msg;
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Real-time error clearing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ── Send Email ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitStatus("loading");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitStatus("success");
      setFormData({ from_name: "", reply_to: "", message: "" });
      setFormErrors({});
      // 5 saniyə sonra reset
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="home-wrapper">
      {/* ── NAVBAR ── */}
      <nav className="navbar-fixed">
        <div className="container nav-flex">
          <div className="logo">
            <span>INSYDE</span>
          </div>
          <div className="actions">
            <div className="lang-switcher">
              <button
                onClick={() => setLang("EN")}
                className={lang === "EN" ? "active" : ""}
              >
                EN
              </button>
              <button
                onClick={() => setLang("AZ")}
                className={lang === "AZ" ? "active" : ""}
              >
                AZ
              </button>
            </div>
            <button
              className="theme-toggle-wrapper"
              onClick={() => setIsDark(!isDark)}
            >
              <div
                className={`theme-indicator ${isDark ? "is-dark" : "is-light"}`}
              >
                {isDark ? <Moon size={16} /> : <Sun size={16} />}
              </div>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="hero-section">
          <div className="container flex-row">
            <div className="hero-text">
              <h1 className="big-title">{t.hero.title}</h1>
              <p className="sub-title">{t.hero.subtitle}</p>
            </div>
            <div className="hero-img">
              <div className="img-frame">
                <img src={Image} alt="Hero" />
              </div>
            </div>
          </div>
        </section>

        {/* ── STEPS ── */}
        <section className="steps-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{t.how.title}</h2>
            </div>
            <div className="steps-grid">
              {t.how.steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="step-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className="card-top-line"></div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                  <span className="step-num-bg">{step.id}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{t.faq.title}</h2>
            </div>
            <div className="faq-full-grid">
              {t.faq.items.map((f, i) => (
                <div
                  key={i}
                  className={`faq-card ${openFaq === i ? "active" : ""}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="faq-q">
                    {f.q} <ChevronDown className="icon" size={24} />
                  </div>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        className="faq-a-wrapper"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="faq-a-content">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="contact-section">
          <div className="container">
            <div className="section-header center">
              <h2 className="section-title">{t.contact.title}</h2>
              <p className="section-sub">{t.contact.sub}</p>
            </div>

            {/* ── Success / Error Banner ── */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  className="form-alert form-alert--success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <CheckCircle size={18} />
                  <span>{t.contact.success}</span>
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  className="form-alert form-alert--error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <AlertCircle size={18} />
                  <span>{t.contact.error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              ref={formRef}
              className="contact-form-ui"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Name */}
              <div
                className={`form-group ${formErrors.from_name ? "has-error" : ""}`}
              >
                <label htmlFor="from_name">{t.contact.name}</label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  value={formData.from_name}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {formErrors.from_name && (
                  <span className="field-error">{formErrors.from_name}</span>
                )}
              </div>

              {/* Email */}
              <div
                className={`form-group ${formErrors.reply_to ? "has-error" : ""}`}
              >
                <label htmlFor="reply_to">{t.contact.email}</label>
                <input
                  id="reply_to"
                  name="reply_to"
                  type="email"
                  value={formData.reply_to}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {formErrors.reply_to && (
                  <span className="field-error">{formErrors.reply_to}</span>
                )}
              </div>

              {/* Message */}
              <div
                className={`form-group ${formErrors.message ? "has-error" : ""}`}
              >
                <label htmlFor="message">{t.contact.msg}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                />
                {formErrors.message && (
                  <span className="field-error">{formErrors.message}</span>
                )}
              </div>

              <button
                className={`submit-btn ${submitStatus === "loading" ? "loading" : ""}`}
                type="submit"
                disabled={submitStatus === "loading"}
              >
                {submitStatus === "loading" ? (
                  <>
                    <Loader size={16} className="spin-icon" />
                    {t.contact.sending}
                  </>
                ) : (
                  t.contact.btn
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer-premium">
        <div className="container footer-content">
          <div className="footer-main">
            <span className="footer-logo">INSYDE</span>
            <div className="social-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Music2 size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeAll;
