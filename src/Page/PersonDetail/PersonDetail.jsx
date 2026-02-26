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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    AOS.init({
      duration: 1000,
      once: false,
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
  // const person = {
  //   name: "Xxx Xxxxxxx",
  //   role: "Xxxxxxxxxxxxx",
  //   image: "https://static.vecteezy.com/system/resources/thumbnails/057/791/672/small_2x/user-profile-icon-illustration-user-profile-avatar-gold-color-style-free-vector.jpg",
  //   links: [
  //     {
  //       id: 1,
  //       title: "Instagram",
  //       url: "https://www.instagram.com/ali.ismayil_/",
  //       icon: <Instagram size={18} />,
  //     },
  //     {
  //       id: 2,
  //       title: "LinkedIn",
  //       url: "https://www.linkedin.com/in/ali-ismayilzade/",
  //       icon: <Linkedin size={18} />,
  //     },
  //     {
  //       id: 3,
  //       title: "Facebook",
  //       url: "https://www.facebook.com/profile.php?id=61572683141152",
  //       icon: <Facebook size={18} />,
  //     },
  //     {
  //       id: 4,
  //       title: "Website",
  //       url: "https://alismayil.dev/",
  //       icon: <Globe size={18} />,
  //     },
  //     {
  //       id: 5,
  //       title: "GitHub",
  //       url: "https://github.com/AliIsmayl",
  //       icon: <Github size={18} />,
  //     },
  //     {
  //       id: 6,
  //       title: "Email",
  //       url: "mailto:ali.ismayil.681@gmail.com",
  //       icon: <Mail size={18} />,
  //     },
  //     { id: 7, title: "Location", url: "#", icon: <MapPin size={18} /> },
  //     {
  //       id: 8,
  //       title: "Phone",
  //       url: "tel:+9940998982004",
  //       icon: <Phone size={18} />,
  //     },
  //   ],
  // };

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
            >
              <div className="only-text">
                <span className="icon-wrapper">{link.icon}</span>
                <span className="link-text">{link.title}</span>
              </div>
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
