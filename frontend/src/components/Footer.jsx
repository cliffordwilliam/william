import React from "react";

export default function Footer({
  sections = [],
  logo = "https://picsum.photos/100",
  slogan = "No slogan yet.",
}) {
  return (
    <footer class="🤯 🤍">
      <div class="📃">
        <div class="🪟 👇4">
          <div class="💪⬇️">
            <a className="👉a 🔕" href="/">
              <img className="📏2 🖼️" src={logo} alt="logo" />
            </a>
            <p>{slogan}</p>
          </div>
          {sections.map((section, index) => (
            <div key={index} className="💪⬇️">
              <h3 className="👇2 h6">{section.title}</h3>
              <ul className="🗃️ 💪⬇️">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a className="🔕 👙" href={link.endpoint}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p>
          &copy; {new Date().getFullYear()} William. All rights reserved. Made
          with ❤️.
        </p>
      </div>
    </footer>
  );
}
