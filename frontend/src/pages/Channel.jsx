import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { request } from "../store/apiSlice.js";
import c from "../c";

export default function Channel() {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const updateVideos = (data) => {
    setVideos(data.items);
    console.log(data.items);
  };
  const updateChannel = (data) => {
    setChannel(data.items);
    console.log(data.items);
  };
  useEffect(() => {
    dispatch(
      request({
        method: "GET",
        url: `${c.baseYoutubeUrl}/channels`,
        options: {
          params: {
            part: "snippet,statistics",
            id,
          },
          headers: {
            "X-RapidAPI-Key":
              "414cae4958msh09b5e70ceaf8885p110ff8jsn52d83f1906d8",
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
          },
        },
        isLoader: true,
        // isOk: true,
        callback: updateChannel,
      })
    );
    dispatch(
      request({
        method: "GET",
        url: `${c.baseYoutubeUrl}/search`,
        options: {
          params: {
            channelId: id,
            part: "snippet,id",
            order: "date",
            maxResults: "50",
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
  }, [id]);
  return (
    <main>
      <section>
        <div className="📃 💪⬇️">
          <img
            className="👇4 📏h6"
            src={channel?.snippet?.thumbnails?.high?.url}
            alt={channel?.snippet?.title}
          />
          <h2 className="👇2">{channel?.snippet?.title}</h2>
          <p className="👇4">
            {parseInt(channel?.statistics?.subscriberCount).toLocaleString()}{" "}
            Subscribers
          </p>
          <div className="📃 💪⬇️ 🃏 👆7 fadeInUp"></div>
        </div>
      </section>
    </main>
  );
}
