import React, { useState, useEffect } from "react";
import "./HomeAll.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ChevronDown, ArrowRight, Instagram, Music2 } from "lucide-react";
import Image from '../../image/Logo.png'
const TRANSLATIONS = {
  EN: {
    nav: { logo: "INSIGHT" },
    hero: {
      title: "Premium Technology",
      subtitle: "For Modern Businesses. We craft elegant solutions that define the future of luxury tech and quiet confidence.",
    },
    how: {
      title: "How It Works",
      steps: [
        { id: "01", title: "Discover", description: "We analyze your business needs and identify opportunities." },
        { id: "02", title: "Design", description: "Our team crafts elegant solutions tailored to your requirements." },
        { id: "03", title: "Deploy", description: "Seamless implementation with continuous support." },
        { id: "04", title: "Deliver", description: "Experience measurable results and sustainable growth." },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "What services do you offer?", a: "We provide software development and cloud infrastructure." },
        { q: "How long does it take?", a: "Timeline depends on project scope, usually 4-12 weeks." },
        { q: "What makes your approach unique?", a: "We combine technical excellence with premium aesthetic." },
        { q: "Do you provide support?", a: "Yes, we offer 24/7 premium support for all solutions." }
      ],
    },
    contact: {
      title: "Let's Connect",
      sub: "Get in touch to discuss your project",
      name: "Full Name",
      email: "Email Address",
      msg: "Message",
      btn: "Send Message",
    },
  },
  AZ: {
    nav: { logo: "İNSAYT" },
    hero: {
      title: "Premium Texnologiya",
      subtitle: "Müasir Bizneslər Üçün. Biz lüks texnologiyanın və sakit inamın gələcəyini müəyyən edən zərif həllər yaradırıq.",
    },
    how: {
      title: "Necə İşləyir",
      steps: [
        { id: "01", title: "Kəşf et", description: "Biz sizin biznes ehtiyaclarınızı təhlil edirik." },
        { id: "02", title: "Dizayn", description: "Komandamız sizə uyğun zərif həllər hazırlayır." },
        { id: "03", title: "Tətbiq", description: "Davamlı dəstək ilə problemsiz tətbiq." },
        { id: "04", title: "Təhvil", description: "Ölçülə bilən nəticələr və davamlı böyümə." },
      ],
    },
    faq: {
      title: "Tez-tez Verilən Suallar",
      items: [
        { q: "Hansı xidmətləri təklif edirsiniz?", a: "Proqram təminatı və bulud infrastrukturu həlləri." },
        { q: "Nə qədər vaxt aparır?", a: "Layihədən asılı olaraq 4-12 həftə." },
        { q: "Sizi unikal edən nədir?", a: "Texniki mükəmməlliyi premium estetika ilə birləşdiririk." },
        { q: "Dəstək göstərirsinizmi?", a: "Bəli, 24/7 premium dəstək təklif edirik." }
      ],
    },
    contact: {
      title: "Bizimlə Əlaqə",
      sub: "Layihənizi müzakirə etmək üçün yazın",
      name: "Tam Ad",
      email: "E-poçt",
      msg: "Mesaj",
      btn: "Mesaj Göndər",
    },
  },
};

function HomeAll() {
  const [lang, setLang] = useState("EN");
  const [isDark, setIsDark] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.body.className = isDark ? "dark-theme" : "light-theme";
  }, [isDark]);

  return (
    <div className="home-wrapper">
      {/* NAVBAR */}
      <nav className="navbar-fixed">
        <div className="container nav-flex">
          <div className="logo">
            <span>{t.nav.logo}</span>
          </div>
          <div className="actions">
            <div className="lang-switcher">
              <button onClick={() => setLang("EN")} className={lang === "EN" ? "active" : ""}>EN</button>
              <button onClick={() => setLang("AZ")} className={lang === "AZ" ? "active" : ""}>AZ</button>
            </div>
            <button className="theme-toggle-wrapper" onClick={() => setIsDark(!isDark)}>
              <div className={`theme-indicator ${isDark ? 'is-dark' : 'is-light'}`}>
                {isDark ? <Moon size={16} /> : <Sun size={16} />}
              </div>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="container flex-row">
            <div className="hero-text">
              <div className="ornament"><span className="dot"></span><span className="line"></span><span className="dot"></span></div>
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

        {/* HOW IT WORKS SECTION */}
        <section className="steps-section">
          <div className="container">
            <div className="section-header">
              <div className="ornament"><span className="dot"></span><span className="line"></span><span className="dot"></span><span className="line long"></span></div>
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

        {/* FAQ SECTION */}
        <section className="faq-section">
          <div className="container">
            <div className="section-header">
              <div className="ornament"><span className="dot"></span><span className="line"></span><span className="dot"></span></div>
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

        {/* CONTACT SECTION */}
        <section className="contact-section">
          <div className="container">
            <div className="section-header center">
              <div className="ornament center-orn"><span className="dot"></span><span className="line"></span><span className="dot"></span></div>
              <h2 className="section-title">{t.contact.title}</h2>
              <p className="section-sub">{t.contact.sub}</p>
            </div>
            <form className="contact-form-ui" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group"><label>{t.contact.name}</label><input type="text" /></div>
              <div className="form-group"><label>{t.contact.email}</label><input type="email" /></div>
              <div className="form-group"><label>{t.contact.msg}</label><textarea rows="5"></textarea></div>
              <button className="submit-btn">{t.contact.btn}</button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
   <footer className="footer-premium">
  <div className="container footer-content">
    {/* Sol Ornament */}
    <div className="ornament desktop-only">
      <span className="dot"></span>
      <span className="line"></span>
      <span className="dot"></span>
    </div>

    <div className="footer-main">
      <span className="footer-logo">{t.nav.logo}</span>
      
      {/* Sosial Media Linkləri */}
      <div className="social-links">
        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
          <Instagram size={20} />
        </a>
        <a href="https://tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
          <Music2 size={20} /> {/* TikTok üçün Music2 və ya TikTok ikonu */}
        </a>
      </div>
    </div>

    {/* Sağ Ornament */}
    <div className="ornament desktop-only">
      <span className="dot"></span>
      <span className="line"></span>
      <span className="dot"></span>
    </div>
  </div>
</footer>

    </div>
  );
}

export default HomeAll;
