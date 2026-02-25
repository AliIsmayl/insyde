import React, { useState, useEffect } from "react";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlineCheck,
  AiOutlineDown,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Github,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import "./AdminPanel.scss";
import { Link } from "react-router-dom";

const PLATFORM_MAP = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  Twitter,
  Youtube,
  GitHub: Github,
  Website: Globe,
  Email: Mail,
  Phone,
};

const PLATFORMS = Object.keys(PLATFORM_MAP);

function AdminPanel() {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [socialLinks, setSocialLinks] = useState([
    {
      id: Date.now(),
      platform: "Instagram",
      link: "",
    },
  ]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    const isDark = savedTheme !== null ? JSON.parse(savedTheme) : true;
    document.body.className = isDark ? "dark-theme" : "light-theme";
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const addField = () => {
    setSocialLinks([
      ...socialLinks,
      {
        id: Date.now(),
        platform: "Instagram",
        link: "",
      },
    ]);
  };

  const initiateDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (socialLinks.length > 1) {
      setSocialLinks(socialLinks.filter((item) => item.id !== itemToDelete));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const updateField = (id, key, value) => {
    setSocialLinks(
      socialLinks.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    );
    setActiveDropdownId(null);
  };

  // Platformaya uyğun ikonu render edən funksiya
  const renderIcon = (platformName, size = 18) => {
    const IconComponent = PLATFORM_MAP[platformName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <div className="admin-panel">
      <div className="admin-card">
        <h2 className="admin-title">Admin Panel - Profil Redaktəsi</h2>

        {/* Profil və Məlumat Bölməsi */}
        <div className="profile-section">
          <div className="top-info">
            <div className="upload-container">
              <label className="upload-label">
                <AiOutlineCloudUpload />
                <span>Yüklə</span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  hidden
                  accept="image/*"
                />
              </label>
              {profileImage && (
                <div className="preview-box">
                  <img src={profileImage} alt="user" />
                </div>
              )}
            </div>
            <div className="name-input">
              <label>Ad Soyad</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tam adınızı daxil edin"
              />
            </div>
          </div>

          <div className="about-input">
            <label>Haqqında məlumat</label>
            <textarea
              rows="3"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              placeholder="Özünüz barədə qısa məlumat yazın..."
            ></textarea>
          </div>
        </div>

        {/* Sosial Linklər Siyahısı */}
        <div className="dynamic-list">
          {socialLinks.map((row) => (
            <div key={row.id} className="field-row">
              <div className="row-controls">
                {socialLinks.length > 1 && (
                  <button
                    className="close-btn"
                    onClick={() => initiateDelete(row.id)}
                  >
                    <AiOutlineClose />
                  </button>
                )}
              </div>

              {/* Birləşdirilmiş Platforma və İkon Bölməsi */}
              <div className="select-group">
                <div className="platform-select-wrapper">
                  <div
                    className="select-selected"
                    onClick={() =>
                      setActiveDropdownId(
                        activeDropdownId === row.id ? null : row.id,
                      )
                    }
                  >
                    <div className="selected-content">
                      <span className="icon-preview">
                        {renderIcon(row.platform)}
                      </span>
                      <span className="text-preview">{row.platform}</span>
                    </div>
                    <AiOutlineDown className="arrow-icon" />
                  </div>

                  {activeDropdownId === row.id && (
                    <div className="select-options">
                      {PLATFORMS.map((p) => (
                        <div
                          key={p}
                          className="option-item"
                          onClick={() => updateField(row.id, "platform", p)}
                        >
                          <div className="option-content">
                            {renderIcon(p, 16)}
                            <span>{p}</span>
                          </div>
                          {row.platform === p && (
                            <AiOutlineCheck className="check-icon" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="link-input-wrap">
                <input
                  type="text"
                  placeholder="Link URL"
                  value={row.link}
                  onChange={(e) => updateField(row.id, "link", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="footer-btns">
          <button className="plus-btn" onClick={addField}>
            <AiOutlinePlus />
          </button>
          <button
            className="save-btn"
            onClick={() => alert("Yadda saxlanıldı!")}
          >
            Yadda Saxla
          </button>
        </div>

        <div className="created-by">
          Created by{" "}
          <Link to={"/"} className="link">
            İnsyde
          </Link>
        </div>
      </div>

  {showDeleteModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <div className="icon-badge">
          <AiOutlineExclamationCircle />
        </div>
      </div>
      <div className="modal-body">
        <h3>Silmək istəyirsiniz?</h3>
        <p>Bu əməliyyatı geri qaytarmaq mümkün olmayacaq. Sosial link siyahıdan həmişəlik silinəcək.</p>
      </div>
      <div className="modal-actions">
        <button 
          className="btn-secondary" 
          onClick={() => setShowDeleteModal(false)}
        >
          Ləğv et
        </button>
        <button 
          className="btn-danger" 
          onClick={confirmDelete}
        >
          Bəli, Sil
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default AdminPanel;
