// 🎵 Local Storage Data
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// 🎵 DOM Elements
const favContainer = document.querySelector(".fav-songs");
const favCount = document.getElementById("fav-count");
const playlistCount = document.getElementById("playlist-count");

// 🎵 Update Counts
function updateCounts() {
  favCount.textContent = favorites.length;
  playlistCount.textContent = playlist.length;
}

// 🎵 Render Favorites
function renderFavorites() {
  favContainer.innerHTML = "";

  if (favorites.length === 0) {
    favContainer.innerHTML = `<p>🎶 Your favorites list is empty</p>`;
    return;
  }

  favorites.forEach(song => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="cover">
        <img src="${song.image}" alt="${song.title}">
      </div>
      <h3>${song.title}</h3>
      <p>Genre: ${song.genre}</p>
      <p>Singer: ${song.singer}</p>
      <audio controls>
        <source src="${song.file}" type="audio/mpeg">
      </audio>
      <span class="fav active">❤️</span>
    `;

    favContainer.appendChild(card);

    // Remove from favorites
    card.querySelector(".fav").addEventListener("click", () => {
      favorites = favorites.filter(s => s.id !== song.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
      updateCounts();
    });
  });
}

// 🎵 Init
renderFavorites();
updateCounts();

// 🎵 Ensure Only One Song Plays
document.addEventListener("DOMContentLoaded", () => {
  const audios = document.querySelectorAll("audio");

  audios.forEach(audio => {
    audio.addEventListener("play", () => {
      audios.forEach(otherAudio => {
        if (otherAudio !== audio) {
          otherAudio.pause();
          otherAudio.currentTime = 0; // reset to start
        }
      });
    });
  });
});


