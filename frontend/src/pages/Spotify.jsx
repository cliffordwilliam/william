import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { request } from "../store/apiSlice.js";
import c from "../c";
import SpotifyTrackPlayer from "../components/SpotifyTrackPlayer.jsx";

export default function Spotify() {
  const code = new URLSearchParams(window.location.search).get("code");
  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState([]);
  const [uri, setUri] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const dispatch = useDispatch();
  const saveToken = (data) => {
    window.history.pushState({}, null, "/spotify"); // remove token query
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
    setExpiresIn(data.expires_in);
  };
  // GET TOKEN
  useEffect(() => {
    if (!code) {
      return;
    }
    dispatch(
      request({
        method: "POST",
        url: `https://accounts.spotify.com/api/token`,
        options: {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: {
            client_id: "c427c4dced8b46f092bea016eb4ab5a0",
            client_secret: "12fbed6aadfd45089db0787369dfd7df",
            grant_type: "authorization_code",
            code: code,
            redirect_uri: `${c.baseFrontendUrl}/spotify`,
          },
        },
        isLoader: true,
        // isOk: true,
        callback: saveToken,
      })
    );
  }, [code]);
  function updateTracks(data) {
    const processedTracks = data.tracks.items.map((track) => {
      return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: track.album.images[0],
      };
    });
    console.log(processedTracks);
    setTracks(processedTracks);
  }
  // GET TRACKS
  useEffect(() => {
    if (!accessToken || !search) {
      return;
    }
    dispatch(
      request({
        method: "GET",
        url: `https://api.spotify.com/v1/search?q=${search}&type=track`,
        options: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        isLoader: false,
        isOk: false,
        callback: updateTracks,
      })
    );
  }, [search, accessToken]);
  function onTrackClicked(e, uri) {
    e.preventDefault();
    setUri(uri);
  }
  return (
    <main>
      <section>
        <div className="📃">
          <form className="📃 💪">
            <div className="💪1">
              <label className="📏f" htmlFor="search">
                Search for tracks:
              </label>
              <input
                className="📏f"
                type="text"
                id="search"
                name="search"
                placeholder="Enter track name here"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </form>
          {tracks.length > 0 ? (
            <div className="👆7 👇5 🪟">
              {tracks.map((track, index) => (
                <div className="🃏 💪⬇️" key={index}>
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
              ))}
            </div>
          ) : (
            <p>No tracks found</p>
          )}
          <SpotifyTrackPlayer accessToken={accessToken} trackUri={uri} />
        </div>
      </section>
    </main>
  );
}
