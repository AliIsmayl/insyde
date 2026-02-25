import React, { useState, useEffect } from "react";
import { AiOutlineLock, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ userCode: "", password: "" });

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    const isDark = savedTheme !== null ? JSON.parse(savedTheme) : true;
    document.body.className = isDark ? "dark-theme" : "light-theme";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Giriş cəhdi:", formData);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>Xoş Gəlmisiniz</h2>
          <p>Davam etmək üçün məlumatlarınızı daxil edin</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>İstifadəçi Kodu</label>
            <div className="input-field">
              <AiOutlineUser className="icon" />
              <input 
                type="text" 
                placeholder="USR-XXXX" 
                value={formData.userCode}
                onChange={(e) => setFormData({...formData, userCode: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Şifrə</label>
            <div className="input-field">
              <AiOutlineLock className="icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
              <button 
                type="button" 
                className="eye-btn" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn">Daxil ol</button>
        </form>

        <div className="created-by">
          Created by <Link to="/" className="link">İnsyde</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
