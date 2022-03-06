

// /* When you want to save a note to a local storage, usually what we have is an object
// So when you want to save it in a local storage, you need to convert it to a string first and you do 
// that with JSON.stringify. But when we are getting a note from the local storage, to
// access the values of that note, we have to convert it to an object and we do that with JSON.parse*/



    
//     //Let's put title and text into an object. This is not the object local storage recognizes
//     let myObj = {
//         title: addTitle.value,
//         text: addTxt.value

//     }

//     //Let's push this object into notes object
//     notesObj.push(myObj);

//     //Let's set items. Save the value of title and text
//     //To save anything in local storage, you have to convert to a string
//     localStorage.setItem("notes", JSON.stringify(notesObj));


// //SHOW NOTES ON THE PAGE
// function showNotes(){
//     let notes = localStorage.getItem("notes");
//     if (notes == null) {
//         notesObj = [];

//     } else {
//         notesObj = JSON.parse(notes);
//     }

//     //You've gotten the information from local storage so now display on page

//     let html = " ";
//     notesObj.forEach(function(element, index) {
//         html += `
//         <div id="note">
//                     <p class="note-counter">Note ${index + 1}</p>
//                     <h3 class="note-title">${element.title}</h3>
//                     <p class="note-text">${element.text}</p>
//                     <button id = "${index}" onclick = "deleteNote(this.id)" class="note-btn">Delete Note</button>
//                     <button id = "${index}" onclick = "editNote(this.id)" class="note-btn edit-btn">Edit Note</button>

//                 </div>
//         `;
//     });

//     let noteElm = document.getElementById("notes");
//     if (notesObj.length != 0) {
//         noteElm.innerHTML = html;

//     } else {
//         noteElm.innerHTML = "No notes yet! Add a note using the form above";
//     }
// }




// Add note to local storage
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function (e) {

    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("note-text");

    if (addTitle.value == "" || addTxt.value == "") {
        return alert("Please add Note Title and Details")
    }

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    //   console.log(notesObj);
    showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="note">
            <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title"> ${element.title} </h3>
            <p class="note-text"> ${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
            <button id="${index}"onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
        </div>
            `;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);
    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }

}

// Function to Edit the Note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("note-text");

    if (addTitle.value !== "" || addTxt.value !== "") {
        return alert("Please clear the form before editing a note")
    }

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element, index) => {
        addTitle.value = element.title;
        addTxt.value = element.text;
    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


showNotes();