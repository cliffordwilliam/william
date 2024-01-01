import React from "react";
import SongCard from "./SongCard";

const SongList = ({ tracks, onTrackClicked }) => {
  return (
    <div className="👆7 👇5 🪟">
      {tracks.length > 0 ? (
        tracks.map((track, index) => (
          <SongCard key={index} track={track} onTrackClicked={onTrackClicked} />
        ))
      ) : (
        <p>No tracks found</p>
      )}
    </div>
  );
};

export default SongList;
