import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm({ title, fields, extraLink, callback }) {
  const [formData, setFormData] = useState({});
  const updateState = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const callCallback = (e) => {
    e.preventDefault();
    callback && callback(formData);
  };
  return (
    <div className="📃 fadeInUp">
      <form className="📏6 📃 💪⬇️ 🃏" onSubmit={callCallback}>
        <h2 className="👇2">{title}</h2>
        <p className="👇4">
          {extraLink.text}
          <Link className="ac" to={extraLink.to}>
            {extraLink.linkText}
          </Link>
        </p>
        {fields.map((field, index) => (
          <div key={index} className="📏f">
            <label className="👇" htmlFor={field.name}>
              {field.label}:
            </label>
            <input
              className="👇5 📏f"
              type={field.type}
              id={field.name}
              name={field.name}
              required={true}
              onChange={updateState}
            />
          </div>
        ))}
        <button className="🛎️" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
