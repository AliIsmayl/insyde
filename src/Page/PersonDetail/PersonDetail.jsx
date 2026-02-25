import React, { useEffect, useState } from "react";
import "./PersonDetail.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Instagram,
  Linkedin,
  Twitter,
  Globe,
  Github,
  Mail,
  MapPin,
  Phone,
  Facebook,
} from "lucide-react";
import logoBg from "../../image/Logo1.png";
import shekil from "../../image/yoxlama.jfif";

function PersonDetail() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Ekran ölçüsü dəyişdikdə yoxlayırıq
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // AOS-u başladırıq
    AOS.init({
      duration: 1000,
      once: false,
      // Əgər ekran 768px-dən böyükdürsə animasiyanı söndürürük
      disable: function () {
        return window.innerWidth > 768;
      },
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const person = {
    name: "Ali İsmayıl",
    role: "IT Layihə Meneceri",
    image: shekil,
    links: [
      {
        id: 1,
        title: "Instagram",
        url: "https://www.instagram.com/ali.ismayil_/",
        icon: <Instagram size={18} />,
      },
      {
        id: 2,
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/ali-ismayilzade/",
        icon: <Linkedin size={18} />,
      },
      {
        id: 3,
        title: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61572683141152",
        icon: <Facebook size={18} />,
      },
      {
        id: 4,
        title: "Website",
        url: "https://alismayil.dev/",
        icon: <Globe size={18} />,
      },
      {
        id: 5,
        title: "GitHub",
        url: "https://github.com/AliIsmayl",
        icon: <Github size={18} />,
      },
      {
        id: 6,
        title: "Email",
        url: "mailto:ali.ismayil.681@gmail.com",
        icon: <Mail size={18} />,
      },
      { id: 7, title: "Location", url: "#", icon: <MapPin size={18} /> },
      {
        id: 8,
        title: "Phone",
        url: "tel:+9940998982004",
        icon: <Phone size={18} />,
      },
    ],
  };

  return (
    <div className="person-detail-wrapper">
      <div className="bg-blur-overlay"></div>

      <div className="containerr main-content">
        <header className="profile-header">
          <div className="profile-image-containerr">
            <div className="image-border-animation"></div>
            <img src={person.image} alt={person.name} className="profile-img" />
          </div>
          <div className="profile-info">
            <h1 className="name">{person.name}</h1>
            <div className="role-badge">{person.role}</div>
          </div>
        </header>

        <div className="links-grid">
          {person.links.map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-item"
              // Yalnız mobildə data-aos atributunu əlavə edirik
              data-aos={
                isMobile ? (index % 2 === 0 ? "fade-right" : "fade-left") : ""
              }
              data-aos-duration="1000"
            >
              <span className="icon-wrapper">{link.icon}</span>
              <span className="link-text">{link.title}</span>
            </a>
          ))}
        </div>

        <footer className="footer-containerr">
          <div className="signature">
            <p>
              Created by <span className="brand">INSYDE</span>
            </p>
          </div>
          <div className="footer-logo-wrapper">
            <img src={logoBg} alt="INSYDE Logo" className="footer-logo" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default PersonDetail;
