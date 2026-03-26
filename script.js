const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {
  console.log("Searching:", searchInput.value);
});