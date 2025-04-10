window.onload = function () {
    showNotes();
  };
  
  function addNote() {
    let title = document.getElementById("noteTitle").value.trim();
    let content = document.getElementById("noteInput").value.trim();
  
    if (title === "" && content === "") return;
  
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(notes));
  
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteInput").value = "";
    showNotes();
  }
  
  function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
  }
  
  function showNotes(filteredNotes = null) {
    let notes = filteredNotes || JSON.parse(localStorage.getItem("notes")) || [];
    let html = "";
  
    notes.forEach((note, index) => {
      html += `
        <div class="note">
          <h3>${note.title || "Untitled"}</h3>
          <p>${note.content}</p>
          <button onclick="deleteNote(${index})">Delete</button>
        </div>
      `;
    });
  
    document.getElementById("notesContainer").innerHTML = html;
  }
  
  function filterNotes() {
    let search = document.getElementById("searchInput").value.toLowerCase();
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
  
    let filtered = notes.filter(note =>
      (note.title && note.title.toLowerCase().includes(search)) ||
      (note.content && note.content.toLowerCase().includes(search))
    );
  
    showNotes(filtered);
  }
  