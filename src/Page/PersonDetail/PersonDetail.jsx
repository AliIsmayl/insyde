import React from "react";
import "./PersonDetail.scss";
import {
  Instagram,
  Linkedin,
  Twitter,
  Globe,
  Github,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
// Loqonu import edirik
import logoBg from "../../image/Logo1.png";

function PersonDetail() {
  const person = {
    name: "Emil Zeynalov",
    role: "Senior Full-stack Developer",
    image: "https://picsum.photos/seed/person/300/300",
    links: [
      {
        id: 1,
        title: "Instagram",
        url: "https://instagram.com",
        icon: <Instagram size={18} />,
      },
      {
        id: 2,
        title: "LinkedIn",
        url: "https://linkedin.com",
        icon: <Linkedin size={18} />,
      },
      {
        id: 3,
        title: "Twitter",
        url: "https://twitter.com",
        icon: <Twitter size={18} />,
      },
      {
        id: 4,
        title: "Website",
        url: "https://google.com",
        icon: <Globe size={18} />,
      },
      {
        id: 5,
        title: "GitHub",
        url: "https://github.com",
        icon: <Github size={18} />,
      },
      {
        id: 6,
        title: "Email",
        url: "mailto:example@mail.com",
        icon: <Mail size={18} />,
      },
      { id: 7, title: "Location", url: "#", icon: <MapPin size={18} /> },
      {
        id: 8,
        title: "Phone",
        url: "tel:+9940000000",
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
          {person.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-item"
              data-aos="fade-right"
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
