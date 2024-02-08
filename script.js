const addButton = document.querySelector("#add");

//7.this func is called in the 6th func where we put data in local storage by updating the local storage data
const updateLSData = () => {
  //we take reference of all the text areas
  const textAreaData = document.querySelectorAll("textarea");

  //this is an empty array to keep the data of each textarea as an array element
  const notesData = [];

  //here we take the text from each textarea and push it in the array notesData
  textAreaData.forEach((note) => {
    return notesData.push(note.value);
  });

  //now we push the array formed in the local storage throught he setItem method of the local storage
  //we passthe array as first argument
  // we pass the array as string as second argument as the local storage stored the value in the string form
  //the local storage stores the data in key value pairs
  localStorage.setItem("notesData", JSON.stringify(notesData));
};

//2. this gets called from the add note button
const addNewNote = (text = "") => {
  //we create a div first which has a note class
  const note = document.createElement("div");
  note.classList.add("note");
  //this is the html data that we need in our note div
  const htmlData = `<div class="operations">
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <div class="main ${text ? "" : "hidden"}"></div>
                    <textarea class = "textA ${
                      text ? "hidden" : ""
                    }"></textarea>`;
  //if there is text in the text variable, and we show the main div otherwise the textarea is shown by default.
  //3.we put all the html code in the note div through this afterbegin which means to insert the data right after out div start tag
  note.insertAdjacentHTML("afterbegin", htmlData);
  console.log(note); //to view the inserted div on console

  //now to perform the operation in the note
  //getting references for text area operations
  const editbtn = note.querySelector(".edit");
  const deletebtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textA = note.querySelector(".textA");

  //4.to delete the note we simply remove the note html element
  deletebtn.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });
  document.body.appendChild(note);

  //to get val of text in note div
  //this can also be used when we open the window first time and we keep the text fetched from
  //the step-8 from local storage in the notes automatically.
  textA.value = text;
  main.innerHTML = text;

  //to edit by clicking on edit button.
  //here we toggle the text from text area to the main div.
  //in the main div we cannot edit or write.
  //5.when we again click on the button the main hides and textarea shows in which we can write.
  editbtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textA.classList.toggle("hidden");
  });

  //6.to transfer data from textarea to the main div:
  textA.addEventListener("change", (event) => {
    //here we put the value entered in text area in the main div for displaying
    const value = event.target.value;
    main.innerHTML = value;
    //to store the data in the local storage of the browser in the form of key value pairs
    updateLSData();
  });
};

//1.this gets called when we click on add note button to add a new note
addButton.addEventListener("click", () => addNewNote());

//8. at last when we open a new window and we neeed to see our previous data then we
//call the data back from our local storage as:
const notes = JSON.parse(localStorage.getItem("notesData"));
// console.log(notes);
if (notes) {
  notes.forEach((notec) => addNewNote(notec));
}