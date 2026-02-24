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
import image1 from "../../image/Logo1.png";
import image2 from "../../image/Logo2.png";
import image3 from "../../image/Logo3.png";
import image4 from "../../image/Logo4.png";

function PersonDetail() {
  const person = {
    name: "Emil Zeynalov",
    role: "Senior Full-stack Developer",
    image: "https://picsum.photos/seed/person/300/300",
    bgImage: image1,
    links: [
      { id: 1, title: "Instagram", url: "https://instagram.com" },
      { id: 2, title: "LinkedIn", url: "https://linkedin.com" },
      { id: 3, title: "Twitter", url: "https://twitter.com" },
      { id: 4, title: "Website", url: "https://google.com" },
      { id: 5, title: "GitHub", url: "https://github.com" },
      { id: 6, title: "Email", url: "mailto:example@mail.com" },
      { id: 7, title: "Location", url: "#" },
      { id: 8, title: "Phone", url: "tel:+9940000000" },
    ],
  };

  return (
    <div className="person-detail-wrapper">
      {/* Background & Overlays */}
      <div
        className="bg-overlay-image"
        style={{ backgroundImage: `url(${person.bgImage})` }}
      ></div>
      <div className="bg-blur-overlay"></div>

      <div className="container main-content">
        {/* Profile Section */}
        <header className="profile-header">
          <div className="profile-image">
            <img src={person.image} alt={person.name} />
          </div>
          <div className="profile-info">
            <h1 className="name">{person.name}</h1>
            <p className="role">{person.role}</p>
          </div>
        </header>

        {/* Links Grid Section */}
        <div className="links-grid">
          {person.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-item"
            >
              <span className="link-text">{link.title}</span>
            </a>
          ))}
        </div>

        {/* Signature Footer */}
        <footer className="signature">
          <p>
            Created by <span className="brand">Insyde</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default PersonDetail;
