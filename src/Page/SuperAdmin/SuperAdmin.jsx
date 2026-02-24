import React, { useState, useEffect } from "react";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUser,
  AiOutlineShareAlt,
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlineCheck,
  AiOutlineSave,
} from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./SuperAdmin.scss";
import { Link } from "react-router-dom";

function SuperAdmin() {
  const [socials, setSocials] = useState([
    { id: 1, name: "Instagram", icon: null },
    { id: 2, name: "Facebook", icon: null },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: "Əli Məmmədov",
      userCode: "USR-9921",
      username: "ali01",
      isBlocked: false,
      socialLinks: [
        {
          platform: "Instagram",
          link: "https://instagram.com/ali",
          isEditing: false,
        },
        {
          platform: "Facebook",
          link: "https://facebook.com/ali",
          isEditing: false,
        },
      ],
    },
  ]);

  const [socialForm, setSocialForm] = useState({
    id: null,
    name: "",
    icon: null,
    isEditing: false,
  });
  const [expandedUser, setExpandedUser] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    data: null,
    action: "",
    step: 1,
    tempData: null,
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    const isDark = savedTheme !== null ? JSON.parse(savedTheme) : true;
    document.body.className = isDark ? "dark-theme" : "light-theme";
  }, []);

  // --- Sosial Şəbəkə Linkini Yeniləmə Məntiqi ---
  const toggleLinkEdit = (userId, platform) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            socialLinks: u.socialLinks.map((sl) =>
              sl.platform === platform
                ? { ...sl, isEditing: !sl.isEditing }
                : sl,
            ),
          };
        }
        return u;
      }),
    );
  };

  const updateUserLink = (userId, platform, newLink) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            socialLinks: u.socialLinks.map((sl) =>
              sl.platform === platform ? { ...sl, link: newLink } : sl,
            ),
          };
        }
        return u;
      }),
    );
  };

  // --- Digər Handlers ---
  const handleSocialSubmit = (e) => {
    e.preventDefault();
    if (socialForm.isEditing) {
      setSocials(
        socials.map((s) =>
          s.id === socialForm.id
            ? { ...s, name: socialForm.name, icon: socialForm.icon }
            : s,
        ),
      );
    } else {
      setSocials([
        ...socials,
        { id: Date.now(), name: socialForm.name, icon: socialForm.icon },
      ]);
    }
    setSocialForm({ id: null, name: "", icon: null, isEditing: false });
  };

  const handleFinalConfirm = () => {
    const { type, data, action, tempData } = modal;
    if (type === "user") {
      if (action === "delete") setUsers(users.filter((u) => u.id !== data.id));
      if (action === "block")
        setUsers(
          users.map((u) =>
            u.id === data.id ? { ...u, isBlocked: !u.isBlocked } : u,
          ),
        );
      if (action === "edit")
        setUsers(users.map((u) => (u.id === data.id ? tempData : u)));
    } else if (type === "social" && action === "delete") {
      setSocials(socials.filter((s) => s.id !== data.id));
    }
    setModal({ ...modal, isOpen: false });
  };

  return (
    <div className="super-admin">
      <div className="sa-container">
        <h1 className="sa-main-title">Super Admin Panel</h1>
        <div className="sa-grid">
          {/* Sosial Platformalar */}
          <section className="sa-section">
            <div className="section-header">
              <h3>
                <AiOutlineShareAlt /> Platformalar{" "}
                <span>({socials.length})</span>
              </h3>
            </div>
            <form className="sa-form" onSubmit={handleSocialSubmit}>
              <input
                type="text"
                placeholder="Platforma adı"
                required
                value={socialForm.name}
                onChange={(e) =>
                  setSocialForm({ ...socialForm, name: e.target.value })
                }
              />
              <label className="file-upload-label">
                <AiOutlineCloudUpload />{" "}
                {socialForm.icon ? "Şəkil seçildi" : "İkon Yüklə"}
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setSocialForm({
                      ...socialForm,
                      icon: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
              </label>
              <button
                type="submit"
                className={`submit-btn ${socialForm.isEditing ? "edit-mode" : ""}`}
              >
                {socialForm.isEditing ? (
                  <>
                    <AiOutlineCheck /> Yenilə
                  </>
                ) : (
                  <>
                    <AiOutlinePlus /> Əlavə Et
                  </>
                )}
              </button>
            </form>
            <div className="sa-list">
              {socials.map((s) => (
                <div key={s.id} className="sa-item">
                  <div className="info">
                    {s.icon && (
                      <img src={s.icon} className="mini-icon" alt="" />
                    )}{" "}
                    <span>{s.name}</span>
                  </div>
                  <div className="actions">
                    <button
                      onClick={() => setSocialForm({ ...s, isEditing: true })}
                      className="edit-icon"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() =>
                        setModal({
                          isOpen: true,
                          type: "social",
                          data: s,
                          action: "delete",
                        })
                      }
                      className="del-icon"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* İstifadəçi Bazası */}
          <section className="sa-section">
            <div className="section-header">
              <h3>
                <AiOutlineUser /> İstifadəçi Bazası{" "}
                <span>({users.length})</span>
              </h3>
            </div>
            <div className="sa-list users-faq">
              {users.map((u) => (
                <div
                  key={u.id}
                  className={`faq-user-card ${u.isBlocked ? "is-blocked" : ""}`}
                >
                  <div
                    className="faq-header"
                    onClick={() =>
                      setExpandedUser(expandedUser === u.id ? null : u.id)
                    }
                  >
                    <div className="user-main-info">
                      <span className="user-code">{u.userCode}</span>
                      <span className="user-name">{u.fullName}</span>
                    </div>
                    <div
                      className="faq-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          setModal({
                            isOpen: true,
                            type: "user",
                            data: u,
                            action: "block",
                          })
                        }
                        className="action-btn block"
                      >
                        {u.isBlocked ? <AiOutlineUnlock /> : <AiOutlineLock />}
                      </button>
                      <button
                        onClick={() =>
                          setModal({
                            isOpen: true,
                            type: "user",
                            data: u,
                            action: "edit",
                            step: 1,
                          })
                        }
                        className="action-btn edit"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        onClick={() =>
                          setModal({
                            isOpen: true,
                            type: "user",
                            data: u,
                            action: "delete",
                          })
                        }
                        className="action-btn del"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedUser === u.id && (
                      <motion.div
                        className="faq-body"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                      >
                        <div className="details-grid">
                          <div className="user-links-list">
                            <strong>Sosial Linkləri Redaktə Et:</strong>
                            {u.socialLinks.map((sl, i) => (
                              <div key={i} className="link-edit-row">
                                <span className="plat-name">
                                  {sl.platform}:
                                </span>
                                {sl.isEditing ? (
                                  <div className="edit-input-group">
                                    <input
                                      type="text"
                                      value={sl.link}
                                      onChange={(e) =>
                                        updateUserLink(
                                          u.id,
                                          sl.platform,
                                          e.target.value,
                                        )
                                      }
                                    />
                                    <button
                                      onClick={() =>
                                        toggleLinkEdit(u.id, sl.platform)
                                      }
                                      className="save-link-btn"
                                    >
                                      <AiOutlineSave />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="link-display-group">
                                    <a
                                      href={sl.link}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {sl.link}
                                    </a>
                                    <button
                                      onClick={() =>
                                        toggleLinkEdit(u.id, sl.platform)
                                      }
                                      className="mini-edit-btn"
                                    >
                                      <AiOutlineEdit />
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="created-by">
          Created by <Link to="/" className="link">İnsyde</Link>
        </div>
      </div>

      {/* MODALLAR (Eynidir) */}
      {modal.isOpen && (
        <div className="sa-modal-overlay">
          <div className="sa-modal">
            <button
              className="close-x"
              onClick={() => setModal({ isOpen: false })}
            >
              <AiOutlineClose />
            </button>
            {modal.action === "edit" && modal.step === 1 ? (
              <div className="edit-step">
                <h4>İstifadəçini Redaktə Et</h4>
                <div className="edit-form">
                  <input
                    type="text"
                    defaultValue={modal.data.fullName}
                    id="edit-name"
                  />
                  <input
                    type="text"
                    defaultValue={modal.data.userCode}
                    id="edit-code"
                  />
                  <button
                    className="next-btn"
                    onClick={() =>
                      setModal({
                        ...modal,
                        step: 2,
                        tempData: {
                          ...modal.data,
                          fullName: document.getElementById("edit-name").value,
                          userCode: document.getElementById("edit-code").value,
                        },
                      })
                    }
                  >
                    Yadda Saxla
                  </button>
                </div>
              </div>
            ) : (
              <div className="confirm-step">
                <h4>Təsdiq Tələb Olunur</h4>
                <p>Bu əməliyyatı tamamlamaq istədiyinizə əminsiniz?</p>
                <div className="modal-btns">
                  <button
                    className="cancel"
                    onClick={() => setModal({ isOpen: false })}
                  >
                    İmtina
                  </button>
                  <button className="confirm" onClick={handleFinalConfirm}>
                    Bəli, Təsdiqlə
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SuperAdmin;
