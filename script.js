function LogLibrary(library) {
  this.library = library;
}

LogLibrary.prototype.addLog = function (title, description, date, author) {
  this.library.push(new Log(title, description, date, author));

  const logsContent = document.querySelector(".logs-content");

  // Adding log to DOM
  // Creating elements
  const card = document.createElement("div");
  const logStatus = document.createElement("div");
  const dateElement = document.createElement("span");
  const dotSeparator = document.createElement("span");
  const svgDotSeparator = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  const authorElement = document.createElement("span");
  const preview = document.createElement("div");
  const titleElement = document.createElement("h2");
  const descriptionElement = document.createElement("p");

  // Setting attributes
  svgDotSeparator.setAttribute("width", "2");
  svgDotSeparator.setAttribute("height", "2");
  svgDotSeparator.setAttribute("viewBox", "0 0 2 2");
  svgDotSeparator.setAttribute("fill", "none");
  svgDotSeparator.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  circle.setAttribute("cx", "1");
  circle.setAttribute("cy", "1");
  circle.setAttribute("r", "1");
  circle.setAttribute("fill", "#8D8D8E");

  // Adding classes & contents
  card.classList.add("card");
  logStatus.classList.add("log-status");
  dateElement.classList.add("date");
  dotSeparator.classList.add("dot-separator");
  authorElement.classList.add("author");
  preview.classList.add("preview");
  titleElement.classList.add("truncate");
  descriptionElement.classList.add("truncate");

  titleElement.textContent = title;
  descriptionElement.textContent = description;
  dateElement.textContent = date;
  authorElement.textContent = author;

  // Appending to DOM
  logsContent.appendChild(card);
  card.appendChild(logStatus);
  logStatus.appendChild(dateElement);
  logStatus.appendChild(dotSeparator);
  dotSeparator.appendChild(svgDotSeparator);
  svgDotSeparator.appendChild(circle);
  logStatus.appendChild(authorElement);
  card.appendChild(preview);
  preview.appendChild(titleElement);
  preview.appendChild(descriptionElement);
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
