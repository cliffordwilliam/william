import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { request } from "../store/apiSlice.js";
import c from "../c";
import { Link } from "react-router-dom";

export default function Youtube() {
  const [search, setSearch] = useState("lucky");
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const updateVideos = (data) => {
    setVideos(data.items);
    console.log(data.items);
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      request({
        method: "GET",
        url: `${c.baseYoutubeUrl}/search`,
        options: {
          params: {
            q: search,
            part: "snippet,id",
            regionCode: "US",
            maxResults: "50",
            order: "date",
          },
          headers: {
            "X-RapidAPI-Key":
              "414cae4958msh09b5e70ceaf8885p110ff8jsn52d83f1906d8",
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
          },
        },
        isLoader: true,
        // isOk: true,
        callback: updateVideos,
      })
    );
    setSearch("");
  };
  return (
    <main>
      <section>
        <div className="📃 💪⬇️">
          <h2 className="👇2">Youtube</h2>
          <p className="👇4">Search and play any videos you want here!</p>
          <form className="💪 📏f" onSubmit={onSearchSubmit}>
            <div className="💪1 📏f">
              {/* search */}
              <div className="💪1">
                <label htmlFor="search">Search:</label>
                <input
                  className="📏f"
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Enter your search term"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <button className="🛎️ 👆a" type="submit">
              Search
            </button>
          </form>
          <div className="👆7 👇5 🪟 📏f fadeInUp">
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <div className="🃏 💪⬇️" key={index}>
                  <Link to={`video/${video.videoId}`}>
                    <img
                      className="👇4 📏h4"
                      src={video.snippet?.thumbnails?.high?.url}
                      alt={video.snippet?.title}
                    />
                  </Link>
                  <Link to={`video/${video.videoId}`}>
                    <h3 className="👇2 h6 🦵">{video.snippet?.title}</h3>
                  </Link>
                  <Link to={`channel/${video.snippet?.channelId}`}>
                    <p className="👇4">{video.snippet?.channelTitle}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No videos found</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
