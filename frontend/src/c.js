export default class c {
  static baseUrl = "http://localhost:3000";
  static baseFrontendUrl = window.location.origin;
  static baseSpotifyUrl = `https://accounts.spotify.com/authorize?client_id=c427c4dced8b46f092bea016eb4ab5a0&response_type=code&redirect_uri=${c.baseFrontendUrl}/spotify&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
  static baseYoutubeUrl = "https://youtube-v31.p.rapidapi.com";
}
