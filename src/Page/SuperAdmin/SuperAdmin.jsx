import React, { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUser,
  AiOutlineShareAlt,
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineClose,
  AiOutlineCheck,
  AiOutlineSave,
  AiOutlineExclamationCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import "./SuperAdmin.scss";
import { Link } from "react-router-dom";

function SuperAdmin() {
  const [socials, setSocials] = useState([
    { id: 1, name: "Instagram", iconCode: "AiFillInstagram" },
    { id: 2, name: "Facebook", iconCode: "FaFacebook" },
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
    iconCode: "",
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

  const DynamicIcon = ({ iconName }) => {
    const allIcons = { ...AiIcons, ...FaIcons, ...FiIcons };
    const IconComponent = allIcons[iconName];
    if (!IconComponent)
      return <AiOutlineQuestionCircle style={{ opacity: 0.3 }} />;
    return <IconComponent />;
  };

  const handleSocialSubmit = (e) => {
    e.preventDefault();
    if (socialForm.isEditing) {
      setSocials(
        socials.map((s) =>
          s.id === socialForm.id
            ? { ...s, name: socialForm.name, iconCode: socialForm.iconCode }
            : s,
        ),
      );
    } else {
      setSocials([
        ...socials,
        {
          id: Date.now(),
          name: socialForm.name,
          iconCode: socialForm.iconCode,
        },
      ]);
    }
    setSocialForm({ id: null, name: "", iconCode: "", isEditing: false });
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

  const toggleLinkEdit = (userId, platform) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? {
              ...u,
              socialLinks: u.socialLinks.map((sl) =>
                sl.platform === platform
                  ? { ...sl, isEditing: !sl.isEditing }
                  : sl,
              ),
            }
          : u,
      ),
    );
  };

  const updateUserLink = (userId, platform, newLink) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? {
              ...u,
              socialLinks: u.socialLinks.map((sl) =>
                sl.platform === platform ? { ...sl, link: newLink } : sl,
              ),
            }
          : u,
      ),
    );
  };

  return (
    <div className="super-admin">
      <div className="sa-container">
        <header className="sa-header">
          <h1 className="sa-main-title">Super Admin Panel</h1>
          <p className="sa-subtitle">Sistem İdarəetmə Mərkəzi</p>
        </header>

        <div className="sa-grid">
          {/* Platformalar Bölməsi */}
          <section className="sa-section">
            <div className="section-header">
              <h3>
                <AiOutlineShareAlt /> Platformalar{" "}
                <span>({socials.length})</span>
              </h3>
            </div>
            <form className="sa-form" onSubmit={handleSocialSubmit}>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Platforma adı"
                  required
                  value={socialForm.name}
                  onChange={(e) =>
                    setSocialForm({ ...socialForm, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="React Icon kodu (məs: AiFillInstagram)"
                  required
                  value={socialForm.iconCode}
                  onChange={(e) =>
                    setSocialForm({ ...socialForm, iconCode: e.target.value })
                  }
                />
              </div>
              {socialForm.iconCode && (
                <div className="icon-preview-area">
                  <small>Önizləmə:</small>
                  <div className="preview-item">
                    <DynamicIcon iconName={socialForm.iconCode} />
                  </div>
                </div>
              )}
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

            <div className="sa-list scrollable">
              {socials.map((s) => (
                <div key={s.id} className="sa-item">
                  <div className="info">
                    <div className="icon-badge">
                      <DynamicIcon iconName={s.iconCode} />
                    </div>
                    <div className="text">
                      <span className="name">{s.name}</span>
                      <code className="code-tag">{s.iconCode}</code>
                    </div>
                  </div>
                  <div className="actions">
                    <button
                      onClick={() => setSocialForm({ ...s, isEditing: true })}
                      className="edit-btn"
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
                      className="del-btn"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* İstifadəçi Bazası Bölməsi */}
          <section className="sa-section">
            <div className="section-header">
              <h3>
                <AiOutlineUser /> İstifadəçi Bazası{" "}
                <span>({users.length})</span>
              </h3>
            </div>
            <div className="sa-list scrollable">
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
                      {u.isBlocked && (
                        <span className="blocked-badge">Bloklu</span>
                      )}
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
                        className={`action-btn block ${u.isBlocked ? "is-unblock" : ""}`}
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
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="links-editor-container">
                          <h5>Linkləri Redaktə Et</h5>
                          {u.socialLinks.map((sl, i) => (
                            <div key={i} className="link-row">
                              <span className="label">{sl.platform}:</span>
                              {sl.isEditing ? (
                                <div className="edit-box">
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
                                    title="Yadda saxla"
                                  >
                                    <AiOutlineSave />
                                    <span>Saxla</span>
                                  </button>
                                </div>
                              ) : (
                                <div className="display-box">
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
                                    title="Redaktə et"
                                  >
                                    <AiOutlineEdit />
                                    <span>Redaktə</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="sa-footer">
          Created by{" "}
          <Link to="/" className="insyde-link">
            İnsyde
          </Link>
        </div>
      </div>

      {/* MODALLAR */}
      {modal.isOpen && (
        <div
          className="sa-modal-overlay"
          onClick={(e) =>
            e.target.classList.contains("sa-modal-overlay") &&
            setModal({ isOpen: false })
          }
        >
          <motion.div
            className="sa-modal"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="close-x"
              onClick={() => setModal({ isOpen: false })}
              aria-label="Bağla"
            >
              <AiOutlineClose />
            </button>

            {modal.action === "edit" ? (
              <div className="modal-content">
                <h4>Redaktə Et</h4>
                <div className="modal-form">
                  <div className="field">
                    <label>Ad Soyad</label>
                    <input
                      type="text"
                      defaultValue={modal.data.fullName}
                      id="edit-name"
                    />
                  </div>
                  <div className="field">
                    <label>User Code</label>
                    <input
                      type="text"
                      defaultValue={modal.data.userCode}
                      id="edit-code"
                    />
                  </div>
                  <div className="confirm-btns">
                    <button
                      className="cancel-btn"
                      onClick={() => setModal({ isOpen: false })}
                    >
                      İmtina
                    </button>
                    <button
                      className="confirm-btn next-btn"
                      onClick={() =>
                        setModal({
                          ...modal,
                          step: 2,
                          tempData: {
                            ...modal.data,
                            fullName:
                              document.getElementById("edit-name").value,
                            userCode:
                              document.getElementById("edit-code").value,
                          },
                        })
                      }
                    >
                      Yadda Saxla
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="modal-content confirm">
                <div className="warning-icon">
                  <AiOutlineExclamationCircle />
                </div>
                <h4>Təsdiq Tələb Olunur</h4>
                <p>Bu əməliyyatı tamamlamaq istədiyinizə əminsiniz?</p>
                <div className="confirm-btns">
                  <button
                    className="cancel-btn"
                    onClick={() => setModal({ isOpen: false })}
                  >
                    İmtina
                  </button>
                  <button className="confirm-btn" onClick={handleFinalConfirm}>
                    Bəli, Təsdiqlə
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default SuperAdmin;
