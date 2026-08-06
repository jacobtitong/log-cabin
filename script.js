function Journals(journals) {
  this.journals = journals;
  // Initialize an "All" journal
  this.journals.push(new Journal("All"));
  const all = document.querySelector("#all");
  all.setAttribute("data-id", journals[0].id);

  this.authorsCount;
}

Journals.prototype.addJournal = function (name) {
  this.journals.push(new Journal(name));
};

Journals.prototype.setAuthorsCount = function () {
  function capitalize(str) {
    const string = str.split(" ");
    const cased = [];

    string.map((word) => {
      cased.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
    });

    return cased.join(" ");
  }

  let authorsList = [];
  this.journals[0].logLibrary.library.forEach((log) => {
    authorsList.push(capitalize(log.author));
  });
  authorsList = authorsList.filter((item, pos) => {
    return authorsList.indexOf(item) == pos;
  });
  this.authorsCount = authorsList.length;
};

Journals.prototype.displayAuthorsCount = function () {
  const authorsCountElement = document.querySelector(
    ".authors-count .number-of-authors",
  );
  authorsCountElement.textContent = this.authorsCount;
};

function Journal(name) {
  // Initialize library of logs
  this.logLibrary = new LogLibrary([]);
  this.name = name;
  this.id = crypto.randomUUID();
  this.logsCount;
}

Journal.prototype.setLogsCount = function () {
  this.logsCount = this.logLibrary.library.length;
};

Journal.prototype.getLogsCount = function () {
  return this.logsCount;
};

Journal.prototype.displayLogsCount = function (count, spanPosts) {
  if (spanPosts.parentElement.classList.contains("posts-count")) {
    spanPosts.textContent = count;
    return;
  }
  spanPosts.textContent = "[" + count + "]";
};

Journal.prototype.displayLogs = function () {
  for (const log of this.logLibrary.library) {
    displayLogElements(
      log.title,
      log.description,
      log.date,
      log.author,
      log.id,
    );
  }
  removeCards(currentJournal.id);
};

function LogLibrary(library) {
  this.library = library;
}

LogLibrary.prototype.addLog = function (title, description, date, author, id) {
  date = formatDate(date);
  if (date == null) {
    return;
  }

  // Add to "all" logs category
  generalJournal.logLibrary.library.push(
    new Log(title, description, date, author),
  );

  const menuNumPosts = document.querySelector(".menu h1 .number-of-posts");
  const postsCount = document.querySelector(
    ".menu .posts-count .number-of-posts",
  );

  generalJournal.setLogsCount();
  generalJournal.displayLogsCount(generalJournal.getLogsCount(), spanPostsAll);
  generalJournal.displayLogsCount(generalJournal.getLogsCount(), menuNumPosts);
  generalJournal.displayLogsCount(generalJournal.getLogsCount(), postsCount);
  allJournals.setAuthorsCount();
  allJournals.displayAuthorsCount();

  if (currentJournal.id == generalJournal.id) {
    displayLogElements(
      title,
      description,
      date,
      author,
      currentJournal.logLibrary.library.at(-1).id,
    );
    return;
  }

  // Add to current journal category
  this.library.push(new Log(title, description, date, author));
  displayLogElements(
    title,
    description,
    date,
    author,
    currentJournal.logLibrary.library.at(-1).id,
  );

  currentJournal.setLogsCount();
  currentJournal.displayLogsCount(currentJournal.getLogsCount(), spanPosts);
};

function Log(title, description, date, author) {
  this.title = title;
  this.description = description;
  this.date = date;
  this.author = author;
  this.id = crypto.randomUUID();
}

Log.prototype.viewLog = function (heading, paragraph, date, author) {
  const dialogLogView = document.querySelector(".dialog-log-view");
  const headingElement = document.querySelector(".dialog-log-view .heading");
  const paragraphElement = document.querySelector(
    ".dialog-log-view .paragraph",
  );
  const dateElement = document.querySelector(".dialog-log-view .date");
  const authorElement = document.querySelector(".dialog-log-view .author");

  headingElement.textContent = heading;
  paragraphElement.textContent = paragraph;
  dateElement.textContent = date;
  authorElement.textContent = author;

  dialogLogView.showModal();
};

function removeCards(journalID) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (card.getAttribute("data-journal") != journalID) {
      card.remove();
    }
  });
}

function displayLogElements(title, description, date, author, id) {
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
  card.setAttribute("data-journal", currentJournal.id);
  card.setAttribute("data-id", id);
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
  dateElement.classList.add("date", "truncate");
  dotSeparator.classList.add("dot-separator", "icon");
  authorElement.classList.add("author", "truncate");
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

  allowViewLogs();
}

function formatDate(date) {
  date = date.split("-").reverse();

  if (date[2] > 9999 || date[2] < 1000) {
    return null;
  }

  [date[0], date[1]] = [date[1], date[0]];

  date[1] += ",";

  switch (date[0]) {
    case "01":
      date[0] = "Jan";
      break;
    case "02":
      date[0] = "Feb";
      break;
    case "03":
      date[0] = "Mar";
      break;
    case "04":
      date[0] = "Apr";
      break;
    case "05":
      date[0] = "May";
      break;
    case "06":
      date[0] = "Jun";
      break;
    case "07":
      date[0] = "Jul";
      break;
    case "08":
      date[0] = "Aug";
      break;
    case "09":
      date[0] = "Sep";
      break;
    case "10":
      date[0] = "Oct";
      break;
    case "11":
      date[0] = "Nov";
      break;
    case "12":
      date[0] = "Dec";
      break;
  }

  date = date.join(" ");
  return date;
}

// Initialize journal
const allJournals = new Journals([]);
const generalJournal = allJournals.journals[0];
let currentJournal = generalJournal;

// View logs
function allowViewLogs() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      currentJournal.logLibrary.library.forEach((log) => {
        if (e.currentTarget.getAttribute("data-id") === log.id) {
          log.viewLog(log.title, log.description, log.date, log.author);
          return;
        }
      });
    });
  });
}

// Allow moving of different journals
function allowJournalMoving(initialJournal) {
  initialJournal.classList.add("clicked");

  currentJournal.displayLogs();
  let liJournalList = document.querySelectorAll(".menu .journal-list li");

  liJournalList.forEach((li) => {
    li.addEventListener("click", (e) => {
      liJournalList = document.querySelectorAll(".menu .journal-list li");

      // Checks whether the list item has already been clicked before
      if (e.currentTarget.classList.contains("clicked")) {
        return;
      }

      currentJournal = allJournals.journals.filter(
        (journal) => journal.id == e.currentTarget.getAttribute("data-id"),
      );
      currentJournal = currentJournal[0];
      // Removes all classes of "clicked" in .journal-list
      liJournalList.forEach((li) => {
        li.classList.remove("clicked");
      });
      e.currentTarget.classList.add("clicked");
      if (e.currentTarget.classList.contains("clicked")) {
        currentJournal.displayLogs();
        setCurrentSpanPosts(e.currentTarget.children[2]);
      }
    });
  });
}

// Span number-of-posts
const spanPostsAll = document.querySelector("#all .number-of-posts");
let spanPosts;
function setCurrentSpanPosts(span) {
  spanPosts = span;
}

// Adding a journal
const addJournalButton = document.querySelector(".menu .add-journal");

addJournalButton.addEventListener("click", () => {
  if (addJournalButton.classList.contains("clicked")) {
    return;
  }
  const menuList = document.querySelector(".menu nav ul .journal-list");
  const li = document.createElement("li");
  const form = document.createElement("form");
  const input = document.createElement("input");

  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter name");
  input.setAttribute("name", "name");

  menuList.appendChild(li);
  li.appendChild(form);
  form.appendChild(input);

  input.focus();

  addJournalButton.classList.add("clicked");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Removes the .clicked class from all list elements, so that, when creating a new journal, all the previous list item's .clicked class would be removed.
    let allLists = document.querySelectorAll(
      ".menu nav ul .journal-list li[data-id]",
    );
    allLists.forEach((list) => {
      list.classList.remove("clicked");
    });

    addJournalButton.classList.remove("clicked");
    const formData = new FormData(form);
    formDataObj = Object.fromEntries(formData);

    // Add journal here
    allJournals.addJournal(formDataObj.name);

    li.setAttribute("style", "display: none;");

    // Add journal to list
    const liJournalList = document.createElement("li");
    const spanIcon = document.createElement("span");
    const spanJournalName = document.createElement("span");
    const spanPosts = document.createElement("span");
    const svgMinus = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    liJournalList.setAttribute("data-id", allJournals.journals.at(-1).id);
    svgMinus.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgMinus.setAttribute("height", "24px");
    svgMinus.setAttribute("viewBox", "0 -960 960 960");
    svgMinus.setAttribute("width", "24px");
    svgMinus.setAttribute("fill", "#e3e3e3");
    path.setAttribute("d", "M200-440v-80h560v80H200Z");

    spanJournalName.classList.add("journal-name", "truncate");
    spanIcon.classList.add("minus-icon", "icon");
    spanPosts.classList.add("number-of-posts");

    spanJournalName.textContent = formDataObj.name;
    spanPosts.textContent = "[00]";

    menuList.appendChild(liJournalList);
    liJournalList.appendChild(spanIcon);
    spanIcon.appendChild(svgMinus);
    svgMinus.appendChild(path);
    liJournalList.appendChild(spanJournalName);
    liJournalList.appendChild(spanPosts);

    // Move to new journal
    currentJournal = allJournals.journals.at(-1);

    latestList = document.querySelector(
      ".menu nav ul .journal-list li:last-child",
    );

    allowJournalMoving(latestList);
    setCurrentSpanPosts(spanPosts);
  });
});

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

// Gathering form data
let formDataObj;
const form = document.querySelector(".dialog-log form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  formDataObj = Object.fromEntries(formData);
  dialogLog.close();

  currentJournal.logLibrary.addLog(
    formDataObj.heading,
    formDataObj.paragraph,
    formDataObj.date,
    formDataObj.author,
    currentJournal.id,
  );
  allowViewLogs();
});
