// 🎵 Local Storage Initialization
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// 🎵 DOM Elements
const favCount = document.getElementById("fav-count");
const playlistCount = document.getElementById("playlist-count");
const songCards = document.querySelectorAll(".card");
const searchInput = document.getElementById("search-input");

// 🎵 Update Counts (Favorites / Playlist)
function updateCounts() {
  favCount.textContent = favorites.length;
  playlistCount.textContent = playlist.length;
}
updateCounts();

// 🎵 Song Card Setup
songCards.forEach(card => {
  const btn = card.querySelector("button");
  const fav = card.querySelector(".fav");

  // Build song object from DOM
  const song = {
    id: card.id,
    title: card.querySelector("h3").textContent,
    genre: card.querySelector("p:nth-of-type(1)").textContent.replace("Genre: ", ""),
    singer: card.querySelector("p:nth-of-type(2)").textContent.replace("Singer: ", ""),
    file: card.querySelector("audio source").getAttribute("src"),
    image: card.querySelector("img").getAttribute("src")
  };

  // Playlist Button Setup
  if (playlist.some(s => s.id === song.id)) {
    btn.textContent = "Remove from Playlist";
    btn.classList.add("in-playlist");
  }

  btn.addEventListener("click", () => {
    const index = playlist.findIndex(s => s.id === song.id);
    if (index > -1) {
      // Remove from playlist
      playlist.splice(index, 1);
      btn.textContent = "Add to Playlist";
      btn.classList.remove("in-playlist");
    } else {
      // Add to playlist
      playlist.push(song);
      btn.textContent = "Remove from Playlist";
      btn.classList.add("in-playlist");
    }
    localStorage.setItem("playlist", JSON.stringify(playlist));
    updateCounts();
  });

  // Favorite Button Setup
  if (favorites.some(s => s.id === song.id)) {
    fav.classList.add("active");
    fav.textContent = "❤️";
  }

  fav.addEventListener("click", () => {
    const index = favorites.findIndex(s => s.id === song.id);
    if (index > -1) {
      // Remove from favorites
      favorites.splice(index, 1);
      fav.classList.remove("active");
      fav.textContent = "♡";
    } else {
      // Add to favorites
      favorites.push(song);
      fav.classList.add("active");
      fav.textContent = "❤️";
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateCounts();
  });
});

// 🎵 Search Functionality
searchInput.addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  songCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const genre = card.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
    const singer = card.querySelector("p:nth-of-type(2)").textContent.toLowerCase();

    card.style.display =
      (title.includes(query) || genre.includes(query) || singer.includes(query))
        ? "block"
        : "none";
  });
});

// 🎵 Ensure Only One Song Plays
document.addEventListener("DOMContentLoaded", () => {
  const audios = document.querySelectorAll("audio");

  audios.forEach(audio => {
    audio.addEventListener("play", () => {
      audios.forEach(otherAudio => {
        if (otherAudio !== audio) {
          otherAudio.pause();
          otherAudio.currentTime = 0; // reset playback
        }
      });
    });
  });
});
