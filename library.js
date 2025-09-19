
    function updateLibraryCounts() {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
      document.getElementById("fav-count-main").textContent = favorites.length;
      document.getElementById("playlist-count-main").textContent = playlist.length;
    }

    updateLibraryCounts();

    // Update counts if localStorage changes (other tabs)
    window.addEventListener("storage", updateLibraryCounts);
