import React, { useState, useEffect } from "react";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineCloudUpload,
  AiOutlineCheck,
  AiOutlineDown,
} from "react-icons/ai";
import "./AdminPanel.scss";
import { Link } from "react-router-dom";

// Platformalar və onlara uyğun şəkil URL-lərinin xəritəsi
const PLATFORM_MAP = {
  Instagram: "https://cdn-icons-png.flaticon.com/512/174/174855.png",
  Facebook: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
  LinkedIn: "https://cdn-icons-png.flaticon.com/512/3536/3536505.png",
  Twitter: "https://cdn-icons-png.flaticon.com/512/3256/3256013.png",
  TikTok: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png",
  Youtube: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
};

const PLATFORMS = Object.keys(PLATFORM_MAP);

function AdminPanel() {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [activeDropdown, setActiveDropdown] = useState({
    id: null,
    type: null,
  });

  // Mövzu məntiqi - LocalStorage-dan oxuyur
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    const isDark = savedTheme !== null ? JSON.parse(savedTheme) : true;
    document.body.className = isDark ? "dark-theme" : "light-theme";
  }, []);

  const [socialLinks, setSocialLinks] = useState([
    {
      id: Date.now(),
      platform: "Instagram",
      icon: PLATFORM_MAP["Instagram"],
      link: "",
      isActive: true,
    },
  ]);

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
        icon: PLATFORM_MAP["Instagram"],
        link: "",
        isActive: true,
      },
    ]);
  };

  const removeField = (id) => {
    if (socialLinks.length > 1) {
      setSocialLinks(socialLinks.filter((item) => item.id !== id));
    }
  };

  const updateField = (id, key, value) => {
    setSocialLinks(
      socialLinks.map((item) => {
        if (item.id === id) {
          let updatedItem = { ...item, [key]: value };
          // Platforma seçiləndə şəkli avtomatik dəyiş
          if (key === "platform") {
            updatedItem.icon = PLATFORM_MAP[value];
          }
          return updatedItem;
        }
        return item;
      }),
    );
    setActiveDropdown({ id: null, type: null });
  };

  return (
    <div className="admin-panel">
      <div className="admin-card">
        <h2 className="admin-title">Admin Panel - Profil Redaktəsi</h2>

        {/* Üst hissə: Şəkil və Ad */}
        <div className="profile-section">
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

        {/* Dinamik Sosial Sahələr */}
        <div className="dynamic-list">
          {socialLinks.map((row) => (
            <div key={row.id} className="field-row">
              {/* Switch Məntiqi */}
              <label className="custom-switch">
                <input
                  type="checkbox"
                  checked={row.isActive}
                  onChange={(e) =>
                    updateField(row.id, "isActive", e.target.checked)
                  }
                />
                <span className="slider"></span>
              </label>

              {/* Platforma Select - Yalnız Switch AÇIQ olduqda Aktivdir */}
              <div
                className={`custom-select-wrap ${!row.isActive ? "disabled-select" : ""}`}
              >
                <div
                  className="select-selected"
                  onClick={() =>
                    row.isActive &&
                    setActiveDropdown(
                      activeDropdown.id === row.id &&
                        activeDropdown.type === "plat"
                        ? { id: null, type: null }
                        : { id: row.id, type: "plat" },
                    )
                  }
                >
                  {row.platform} <AiOutlineDown className="arrow-icon" />
                </div>
                {activeDropdown.id === row.id &&
                  activeDropdown.type === "plat" && (
                    <div className="select-options">
                      {PLATFORMS.map((p) => (
                        <div
                          key={p}
                          className="option-item"
                          onClick={() => updateField(row.id, "platform", p)}
                        >
                          {p}{" "}
                          {row.platform === p && (
                            <AiOutlineCheck className="check-icon" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* İkon Select (Image) - Yalnız Switch BAĞLI olduqda Aktivdir */}
              <div
                className={`custom-select-wrap icon-select ${row.isActive ? "disabled-select" : ""}`}
              >
                <div
                  className="select-selected"
                  onClick={() =>
                    !row.isActive &&
                    setActiveDropdown(
                      activeDropdown.id === row.id &&
                        activeDropdown.type === "icon"
                        ? { id: null, type: null }
                        : { id: row.id, type: "icon" },
                    )
                  }
                >
                  <img
                    src={row.icon}
                    alt="selected-icon"
                    className="selected-img"
                  />
                  <AiOutlineDown className="arrow-icon" />
                </div>
                {activeDropdown.id === row.id &&
                  activeDropdown.type === "icon" && (
                    <div className="select-options">
                      {PLATFORMS.map((p) => (
                        <div
                          key={p}
                          className="option-item img-option"
                          onClick={() =>
                            updateField(row.id, "icon", PLATFORM_MAP[p])
                          }
                        >
                          <img
                            src={PLATFORM_MAP[p]}
                            alt={p}
                            className="dropdown-img"
                          />
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* Link Input */}
              <div className="link-input-wrap">
                <input
                  type="text"
                  placeholder="Link URL"
                  value={row.link}
                  onChange={(e) => updateField(row.id, "link", e.target.value)}
                />
              </div>

              {/* Silmə Düyməsi */}
              {socialLinks.length > 1 && (
                <button className="del-btn" onClick={() => removeField(row.id)}>
                  <AiOutlineDelete />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Alt Düymələr */}
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

        {/* İmza */}
        <div className="created-by">
          Created by{" "}
          <Link to={"/"} className="link">
            İnsyde
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
