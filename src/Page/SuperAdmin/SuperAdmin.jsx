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
  AiOutlineUserAdd,
  AiOutlineUp,
  AiOutlineDown,
} from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import "./SuperAdmin.scss";
import { Link } from "react-router-dom";

// ─── Slug Generator ───────────────────────────────────
const generateSlug = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_";
  let slug = "";
  while (slug.length < 15) {
    slug += chars[Math.floor(Math.random() * chars.length)];
  }
  return slug;
};

// ─── UserCode Generator (maks. 9 istifadəçi) ─────────
const generateUserCode = (existingUsers = []) => {
  const existing = new Set(existingUsers.map((u) => u.userCode));
  if (existing.size >= 9) return null;
  let code;
  do {
    const digits = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    code = `SYD${digits}`;
  } while (existing.has(code));
  return code;
};

function SuperAdmin() {
  const [socials, setSocials] = useState([
    { id: 1, name: "Instagram", iconCode: "AiFillInstagram" },
    { id: 2, name: "Facebook", iconCode: "FaFacebook" },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: "Əli Məmmədov",
      userCode: generateUserCode([]),
      username: "ali01",
      slug: generateSlug(),
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

  const [newLinkForm, setNewLinkForm] = useState({});
  const [expandedUser, setExpandedUser] = useState(null);
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  const [newUserForm, setNewUserForm] = useState({
    fullName: "",
    password: "",
    slug: generateSlug(),
  });

  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    data: null,
    action: "",
    step: 1,
    tempData: null,
  });

  const closeModal = () =>
    setModal({
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

  // ─── Social Submit ────────────────────────────────────
  const handleSocialSubmit = (e) => {
    e.preventDefault();
    if (socialForm.isEditing) {
      setModal({
        isOpen: true,
        type: "social",
        action: "edit",
        data: socialForm,
        tempData: { name: socialForm.name, iconCode: socialForm.iconCode },
        step: 1,
      });
    } else {
      setSocials([
        ...socials,
        {
          id: Date.now(),
          name: socialForm.name,
          iconCode: socialForm.iconCode,
        },
      ]);
      setSocialForm({ id: null, name: "", iconCode: "", isEditing: false });
    }
  };

  // ─── Final Confirm ────────────────────────────────────
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
        setUsers(
          users.map((u) => (u.id === data.id ? { ...u, ...tempData } : u)),
        );
    }

    if (type === "social") {
      if (action === "delete")
        setSocials(socials.filter((s) => s.id !== data.id));
      if (action === "edit") {
        setSocials(
          socials.map((s) =>
            s.id === data.id
              ? { ...s, name: tempData.name, iconCode: tempData.iconCode }
              : s,
          ),
        );
        setSocialForm({ id: null, name: "", iconCode: "", isEditing: false });
      }
    }

    if (type === "link") {
      if (action === "delete") removeUserLinkDirect(data.userId, data.platform);
      if (action === "edit") toggleLinkEditDirect(data.userId, data.platform);
    }

    closeModal();
  };

  // ─── Link Helpers ─────────────────────────────────────
  const toggleLinkEditDirect = (userId, platform) => {
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

  const removeUserLinkDirect = (userId, platform) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? {
              ...u,
              socialLinks: u.socialLinks.filter(
                (sl) => sl.platform !== platform,
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

  const saveLinkEdit = (userId, platform) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? {
              ...u,
              socialLinks: u.socialLinks.map((sl) =>
                sl.platform === platform ? { ...sl, isEditing: false } : sl,
              ),
            }
          : u,
      ),
    );
  };

  const addNewLink = (userId, platform, link) => {
    if (!platform.trim() || !link.trim()) return;
    setUsers(
      users.map((u) =>
        u.id === userId
          ? {
              ...u,
              socialLinks: [
                ...u.socialLinks,
                { platform, link, isEditing: false },
              ],
            }
          : u,
      ),
    );
    setNewLinkForm((prev) => ({
      ...prev,
      [userId]: { platform: "", link: "" },
    }));
  };

  // ─── Yeni İstifadəçi ─────────────────────────────────
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserForm.fullName.trim()) return;
    if (users.length >= 9) return;

    const code = generateUserCode(users);
    if (!code) return;

    const newUser = {
      id: Date.now(),
      fullName: newUserForm.fullName,
      userCode: code,
      username: newUserForm.fullName.toLowerCase().replace(/\s+/g, ""),
      password: newUserForm.password || "",
      slug: newUserForm.slug,
      isBlocked: false,
      socialLinks: [],
    };

    setUsers([...users, newUser]);
    setNewUserForm({ fullName: "", password: "", slug: generateSlug() });
    setShowNewUserForm(false);
  };

  const isMaxUsers = users.length >= 9;

  return (
    <div className="super-admin">
      <div className="sa-container">
        <header className="sa-header">
          <h1 className="sa-main-title">Super Admin Panel</h1>
          <p className="sa-subtitle">Sistem İdarəetmə Mərkəzi</p>
        </header>

        <div className="sa-grid">
          {/* ── Platformalar ── */}
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
                      onClick={() =>
                        setModal({
                          isOpen: true,
                          type: "social",
                          action: "edit",
                          data: s,
                          tempData: { name: s.name, iconCode: s.iconCode },
                          step: 1,
                        })
                      }
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
                          step: 1,
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

          {/* ── İstifadəçi Bazası ── */}
          <section className="sa-section">
            <div className="section-header">
              <h3>
                <AiOutlineUser /> İstifadəçi Bazası{" "}
                <span>({users.length})</span>
              </h3>
              <button
                className="add-user-toggle"
                onClick={() => !isMaxUsers && setShowNewUserForm((v) => !v)}
                disabled={isMaxUsers}
                title={isMaxUsers ? "Maksimum 9 istifadəçiyə çatılıb" : ""}
              >
                {showNewUserForm ? (
                  <>
                    <AiOutlineUp /> Bağla
                  </>
                ) : (
                  <>
                    <AiOutlineUserAdd /> Yeni İstifadəçi
                  </>
                )}
              </button>
            </div>

            {/* ── Yeni İstifadəçi Formu ── */}
            <AnimatePresence>
              {showNewUserForm && !isMaxUsers && (
                <motion.div
                  className="new-user-inline"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <form className="new-user-form" onSubmit={handleAddUser}>
                    <div className="new-user-grid">
                      <div className="field">
                        <label>
                          Ad Soyad <span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Əli Məmmədov"
                          required
                          value={newUserForm.fullName}
                          onChange={(e) =>
                            setNewUserForm({
                              ...newUserForm,
                              fullName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="field">
                        <label>Parol</label>
                        <input
                          type="text"
                          placeholder="••••••"
                          value={newUserForm.password}
                          onChange={(e) =>
                            setNewUserForm({
                              ...newUserForm,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="field slug-field">
                        <label>
                          Slug <span className="optional">(avtomatik)</span>
                        </label>
                        <div className="slug-display">
                          <code>{newUserForm.slug}</code>
                          <button
                            type="button"
                            className="regen-slug-btn"
                            onClick={() =>
                              setNewUserForm((prev) => ({
                                ...prev,
                                slug: generateSlug(),
                              }))
                            }
                            title="Yenidən generasiya et"
                          >
                            ↻
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="new-user-actions">
                      <button
                        type="button"
                        className="cancel-inline-btn"
                        onClick={() => setShowNewUserForm(false)}
                      >
                        İmtina
                      </button>
                      <button type="submit" className="submit-inline-btn">
                        <AiOutlineUserAdd /> Yarat
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Limit xəbərdarlığı */}
            {isMaxUsers && (
              <div className="max-users-warning">
                Maksimum istifadəçi sayına (9) çatılıb.
              </div>
            )}

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
                            step: 1,
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
                            tempData: null,
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
                            step: 1,
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
                                      saveLinkEdit(u.id, sl.platform)
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
                                  <div className="link-actions">
                                    <button
                                      onClick={() =>
                                        setModal({
                                          isOpen: true,
                                          type: "link",
                                          action: "edit",
                                          data: {
                                            userId: u.id,
                                            platform: sl.platform,
                                          },
                                          step: 1,
                                        })
                                      }
                                      className="mini-edit-btn"
                                      title="Redaktə et"
                                    >
                                      <AiOutlineEdit />
                                      <span>Redaktə</span>
                                    </button>
                                    <button
                                      onClick={() =>
                                        setModal({
                                          isOpen: true,
                                          type: "link",
                                          action: "delete",
                                          data: {
                                            userId: u.id,
                                            platform: sl.platform,
                                          },
                                          step: 1,
                                        })
                                      }
                                      className="mini-del-btn"
                                      title="Sil"
                                    >
                                      <AiOutlineDelete />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}

                          {/* Yeni Link Əlavə Et */}
                          <div className="add-link-form">
                            <h6>Yeni Link Əlavə Et</h6>
                            <div className="add-link-inputs">
                              <select
                                value={newLinkForm[u.id]?.platform || ""}
                                onChange={(e) =>
                                  setNewLinkForm((prev) => ({
                                    ...prev,
                                    [u.id]: {
                                      ...prev[u.id],
                                      platform: e.target.value,
                                    },
                                  }))
                                }
                              >
                                <option value="" disabled>
                                  Platforma seç
                                </option>
                                {socials.map((s) => (
                                  <option key={s.id} value={s.name}>
                                    {s.name}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="text"
                                placeholder="Link (məs: https://...)"
                                value={newLinkForm[u.id]?.link || ""}
                                onChange={(e) =>
                                  setNewLinkForm((prev) => ({
                                    ...prev,
                                    [u.id]: {
                                      ...prev[u.id],
                                      link: e.target.value,
                                    },
                                  }))
                                }
                              />
                              <button
                                className="add-link-btn"
                                onClick={() =>
                                  addNewLink(
                                    u.id,
                                    newLinkForm[u.id]?.platform || "",
                                    newLinkForm[u.id]?.link || "",
                                  )
                                }
                              >
                                <AiOutlinePlus />
                                <span>Əlavə Et</span>
                              </button>
                            </div>
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

        <div className="sa-footer">
          Created by{" "}
          <Link to="/" className="insyde-link">
            İnsyde
          </Link>
        </div>
      </div>

      {/* ══ MODALLAR ══════════════════════════════════════ */}
      {modal.isOpen && (
        <div
          className="sa-modal-overlay"
          onClick={(e) =>
            e.target.classList.contains("sa-modal-overlay") && closeModal()
          }
        >
          <motion.div
            className="sa-modal"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.2 }}
          >
            <button className="close-x" onClick={closeModal} aria-label="Bağla">
              <AiOutlineClose />
            </button>

            {/* ── User Edit — Step 1 ── */}
            {modal.type === "user" &&
              modal.action === "edit" &&
              modal.step === 1 && (
                <div className="modal-content">
                  <h4>İstifadəçini Redaktə Et</h4>
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
                        maxLength={9}
                        onChange={(e) => {
                          const val = e.target.value;
                          const isValid = /^SYD\d{0,6}$/.test(val);
                          e.target.style.borderColor = isValid ? "" : "#e74c3c";
                          const errEl =
                            document.getElementById("edit-code-error");
                          if (errEl)
                            errEl.style.display = isValid ? "none" : "flex";
                        }}
                      />
                      <span
                        id="edit-code-error"
                        style={{
                          display: "none",
                          alignItems: "center",
                          gap: "5px",
                          color: "#e74c3c",
                          fontSize: "11px",
                          marginTop: "4px",
                        }}
                      >
                        ⚠ Format: SYD + 6 rəqəm (məs: SYD047291)
                      </span>
                    </div>
                    <div className="confirm-btns">
                      <button className="cancel-btn" onClick={closeModal}>
                        İmtina
                      </button>
                      <button
                        className="confirm-btn next-btn"
                        onClick={() => {
                          const nameVal =
                            document.getElementById("edit-name").value;
                          const codeVal =
                            document.getElementById("edit-code").value;
                          const isValid = /^SYD\d{6}$/.test(codeVal);

                          if (!isValid) {
                            const input = document.getElementById("edit-code");
                            const errEl =
                              document.getElementById("edit-code-error");
                            input.style.borderColor = "#e74c3c";
                            if (errEl) errEl.style.display = "flex";
                            input.focus();
                            return;
                          }

                          setModal({
                            ...modal,
                            step: 2,
                            tempData: {
                              fullName: nameVal,
                              userCode: codeVal,
                            },
                          });
                        }}
                      >
                        Davam Et
                      </button>
                    </div>
                  </div>
                </div>
              )}

            {/* ── User Edit — Step 2 ── */}
            {modal.type === "user" &&
              modal.action === "edit" &&
              modal.step === 2 && (
                <div className="modal-content confirm">
                  <div className="warning-icon warn">
                    <AiOutlineExclamationCircle />
                  </div>
                  <h4>Dəyişikliyi Təsdiqlə</h4>
                  <p>Məlumatlar yenilənəcək. Davam etmək istəyirsiniz?</p>
                  <div className="confirm-btns">
                    <button className="cancel-btn" onClick={closeModal}>
                      İmtina
                    </button>
                    <button
                      className="confirm-btn next-btn"
                      onClick={handleFinalConfirm}
                    >
                      Bəli, Yenilə
                    </button>
                  </div>
                </div>
              )}

            {/* ── Social Edit Modal ── */}
            {modal.type === "social" && modal.action === "edit" && (
              <div className="modal-content">
                <h4>Platformanı Redaktə Et</h4>
                <div className="modal-form">
                  <div className="field">
                    <label>Platforma Adı</label>
                    <input
                      type="text"
                      value={modal.tempData?.name || ""}
                      onChange={(e) =>
                        setModal((prev) => ({
                          ...prev,
                          tempData: { ...prev.tempData, name: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="field">
                    <label>React Icon Kodu</label>
                    <input
                      type="text"
                      value={modal.tempData?.iconCode || ""}
                      onChange={(e) =>
                        setModal((prev) => ({
                          ...prev,
                          tempData: {
                            ...prev.tempData,
                            iconCode: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  {modal.tempData?.iconCode && (
                    <div className="icon-preview-area modal-preview">
                      <small>Önizləmə:</small>
                      <div className="preview-item">
                        <DynamicIcon iconName={modal.tempData.iconCode} />
                      </div>
                    </div>
                  )}
                  <div className="confirm-btns">
                    <button className="cancel-btn" onClick={closeModal}>
                      İmtina
                    </button>
                    <button
                      className="confirm-btn next-btn"
                      onClick={handleFinalConfirm}
                    >
                      <AiOutlineCheck /> Yenilə
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Confirm Modal (delete / block / link) ── */}
            {(modal.action === "delete" ||
              modal.action === "block" ||
              (modal.type === "link" &&
                (modal.action === "delete" || modal.action === "edit"))) && (
              <div className="modal-content confirm">
                <div
                  className={`warning-icon ${
                    modal.action === "delete" ? "danger" : "warn"
                  }`}
                >
                  <AiOutlineExclamationCircle />
                </div>
                <h4>Təsdiq Tələb Olunur</h4>
                <p>
                  {modal.type === "link" && modal.action === "delete"
                    ? `"${modal.data?.platform}" linki silinəcək. Davam etmək istəyirsiniz?`
                    : modal.type === "link" && modal.action === "edit"
                      ? `"${modal.data?.platform}" linkini redaktə etmək istəyirsiniz?`
                      : modal.action === "delete"
                        ? `"${
                            modal.data?.name || modal.data?.fullName
                          }" silinəcək. Davam etmək istəyirsiniz?`
                        : modal.data?.isBlocked
                          ? `"${modal.data?.fullName}" blokdan çıxarılacaq. Davam etmək istəyirsiniz?`
                          : `"${modal.data?.fullName}" bloklanacaq. Davam etmək istəyirsiniz?`}
                </p>
                <div className="confirm-btns">
                  <button className="cancel-btn" onClick={closeModal}>
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
