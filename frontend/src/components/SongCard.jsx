import React from "react";

const SongCard = ({ track, onTrackClicked }) => {
  return (
    <div className="🃏 💪⬇️">
      <img
        className="👇4 📏h4"
        src={track.albumUrl.url}
        alt={`Album cover for ${track.title}`}
      />
      <h3 className="👇2">{track.title}</h3>
      <p className="👇4">{track.artist}</p>
      <button
        className="🛎️ 👆a"
        onClick={(e) => {
          onTrackClicked(e, track.uri);
        }}
      >
        Play
      </button>
    </div>
  );
};

export default SongCard;
