// 🎵 Load Data
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// 🎵 DOM Elements
const playlistTable = document.querySelector("#playlist-table tbody");
const playlistCount = document.getElementById("playlist-count");
const favCount = document.getElementById("fav-count");

// 🎵 Update Counts
function updateCounts() {
  playlistCount.textContent = playlist.length;
  favCount.textContent = favorites.length;
}

// 🎵 Render Playlist
function renderPlaylist() {
  playlistTable.innerHTML = "";

  if (playlist.length === 0) {
    playlistTable.innerHTML = `<tr><td colspan="5">🎶 Your playlist is empty</td></tr>`;
    return;
  }

  playlist.forEach(song => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="song-cell">
        <img src="${song.image}" alt="${song.title}">
        <div class="song-title">
          <h3>${song.title}</h3>
          <p>${song.genre}</p>
        </div>
      </td>
      <td>${song.singer}</td>
      <td>
        <audio controls>
          <source src="${song.file}" type="audio/mpeg">
        </audio>
      </td>
      <td>
        <button class="remove-btn">Remove</button>
      </td>
    `;

    playlistTable.appendChild(row);

    // 🎵 Remove from Playlist
    row.querySelector(".remove-btn").addEventListener("click", () => {
      playlist = playlist.filter(s => s.id !== song.id);
      localStorage.setItem("playlist", JSON.stringify(playlist));
      renderPlaylist();
      updateCounts();
    });
  });

  updateCounts();
}

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

// 🎵 Init
renderPlaylist();
updateCounts();
