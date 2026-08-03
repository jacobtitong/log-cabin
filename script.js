function LogLibrary(library) {
  this.library = library;
}

LogLibrary.prototype.addLog = function (title, description, date, author) {
  this.library.push(new Log(title, description, date, author));
};

function Log(title, description, date, author) {
  this.title = title;
  this.description = description;
  this.date = date;
  this.author = author;
  this.id = crypto.randomUUID();
}

// Displaying and Hiding Dialog
const dialogLog = document.querySelector(".dialog-log");
const showButton = document.querySelector(".add-log button");
const closeButton = document.querySelector(".dialog-log .exit-button");

showButton.addEventListener("click", () => {
  dialogLog.showModal();
});

closeButton.addEventListener("click", () => {
  dialogLog.close();
});

document.addEventListener("click", (e) => {
  if (!e.target.contains(dialogLog)) return;
  dialogLog.close();
});

// Initialize library of logs
const logLibrary = new LogLibrary([]);

// Gathering form data
let formDataObj;
const form = document.querySelector(".dialog-log form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  formDataObj = Object.fromEntries(formData);
  dialogLog.close();

  logLibrary.addLog(
    formDataObj.heading,
    formDataObj.paragraph,
    formDataObj.date,
    formDataObj.author,
  );
});
