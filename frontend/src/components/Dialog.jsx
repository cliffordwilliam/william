import React from "react";
import { useSelector } from "react-redux";

export default function Dialog() {
  const { data, loading, error } = useSelector((state) => state.api);
  return (
    <dialog className={`${loading ? "transparent" : ""}`}>
      {data && <h2 className="👇2">Success</h2>}
      {error && <h2 className="👇2">Error</h2>}
      {loading && <div className="loader"></div>}
      {data && <p className="👇4">{data.message}</p>}
      {error && <p className="👇4">{error}</p>}
      {!loading && (
        <button
          className="🛎️"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("dialog").close();
          }}
        >
          Close
        </button>
      )}
    </dialog>
  );
}
