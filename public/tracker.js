function saveNotes() {

  const notes = document.getElementById("notes").value;

  localStorage.setItem("glowNotes", notes);

  document.getElementById("saved-msg").innerText =
    "✨ Notes saved successfully!";
}

/* load saved notes automatically */

window.onload = function () {

  const savedNotes = localStorage.getItem("glowNotes");

  if (savedNotes) {
    document.getElementById("notes").value = savedNotes;
  }
};