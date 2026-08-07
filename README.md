# Log Cabin

Log Cabin is a website for storing logs, similar to a journal. It can contain multiple journals with multiple different logs for keeping records of any information the user would like to keep.

This is my first big personal project I have created which was inspired by the [library project from The Odin Project](). A project attempting to use object instances, prototypes, and constructors in JavaScript. This was a test of my understanding of these concepts without the help of AI, and a test of my ability to research by referring only through MDN documentation, Stack Overflow, Reddit, some YouTube tutorials, and some articles on the internet.

## Table of contents

- [Overview](#overview)
  - [Screenshots](#screenshots)
    - [Initial Design Created in Figma](#initial-design-created-in-figma)
    - [Final Website Design](#final-website-design)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### Screenshots

#### Initial Design Created in Figma

![Desktop (Main Screen)](<./designs/Desktop%20(Main%20screen).png>)
![Desktop (Input Screen)](<./designs/Desktop%20(Input%20screen).png>)

#### Final Website Design

![Desktop (Main Screen)](<./designs/website/Desktop%20(Main%20screen).png>)
![Desktop (Input Screen)](<./designs/website/Desktop%20(Input%20screen).png>)
![Desktop (Log View Screen)](<./designs/website/Desktop%20(Log%20view%20screen).png>)

### Links

- Github URL: [Github Source Code](https://github.com/jacobtitong/log-cabin)
- Live Github Page URL: [Live Github Page](https://jacobtitong.github.io/log-cabin/)

## My process

### Built with

- Figma
- Google Fonts
- Google Icons
- Semantic HTML5 markup
- HTML dialog and forms
- CSS variables, custom properties, grid, and flexbox
- JavaScript DOM manipulation
- JavaScript object instances, prototypes, and constructors
- **Multiple References:** MDN documentation, Stack Overflow, Reddit, some YouTube tutorials, and some articles on the internet

### What I learned

1. Learned how to reset a form to stop saving inputs.

```js
form.reset();
```

2. Learned how to gather data from a form using JavaScript.

```js
// Gathering form data
let formDataObj;
const form = document.querySelector(".dialog-log form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  formDataObj = Object.fromEntries(formData);
  ...
```

3. Learned how to prevent form from reloading page upon submission.

```js
form.addEventListener("submit", (e) => {
    e.preventDefault();
    ...
```

4. Learned how to open and close a modal dialog using JavaScript.

```js
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
```

5. Learned how to add HTML elements to the DOM

```js
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
```

6. Learned how to generate IDs and implement them for _"data-"_ attributes.

```js
function Journals(journals) {
  this.journals = journals;
  // Initialize an "All" journal
  this.journals.push(new Journal("All"));
  const all = document.querySelector("#all");
  all.setAttribute("data-id", journals[0].id);

  this.authorsCount;
}

function Journal(name) {
  // Initialize library of logs
  this.logLibrary = new LogLibrary([]);
  this.name = name;
  this.id = crypto.randomUUID();
  this.logsCount;
}
```

7. Learned how to apply event listeners for newly added/appended elements.

```js
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

function allowDeletions() {
  const allDeleteIcons = document.querySelectorAll(".delete-icon");

  allDeleteIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const id = e.currentTarget.parentElement.getAttribute("data-id");
      currentJournal.logLibrary.deleteLog(id);
    });
  });
}
```

8. Learned how to make user focus on an input using JavaScript upon creating them.

```js
input.focus();
```

9. Learned how to add SVG elements to the DOM

```js
const svgMinus = document.createElementNS("http://www.w3.org/2000/svg", "svg");
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
spanPosts.textContent = "[0]";

menuList.appendChild(liJournalList);
liJournalList.appendChild(spanIcon);
spanIcon.appendChild(svgMinus);
svgMinus.appendChild(path);
```

10. Learned to use prototypes for methods, while constructors for fields.

```js
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
```

11. Learned that you can create an instance of an object inside another object.

As seen from the example below, each Journal has their own library of logs.

```js
unction Journal(name) {
  // Initialize library of logs
  this.logLibrary = new LogLibrary([]);
  this.name = name;
  this.id = crypto.randomUUID();
  this.logsCount;
}

function LogLibrary(library) {
  this.library = library;
}
```

12. Learned how to make modal dialogs close upon clicking outside of it.

```js
document.addEventListener("click", (e) => {
  if (!e.target.contains(dialogLog)) return;
  dialogLog.close();
});
```

13. Learned how to make sticky elements without overlapping each other.

```css
header {
  position: sticky;
  top: 0;
  z-index: 1;
}

.sticky {
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: sticky;
  top: 100px;
}
```

### Continued development

I want to continue learning the best practices on how to properly structure my code and make it cleaner and maintainable for other developers. As of now, my code for this project seems a bit messy and I suspect that I will have a difficult time analyzing it in the future.

### Useful resources

- [Google Icons](https://fonts.google.com/icons) - This helped me get existing SVG icons that I was not able to make in Figma.
- [Google Fonts](https://fonts.google.com/) - This helped me get the necessary fonts for my website: [Inter](https://fonts.google.com/specimen/Inter) and [Sometype Mono](https://fonts.google.com/specimen/Sometype+Mono?preview.script=Latn).
- [Transfonter](https://transfonter.org/) - This allowed me to convert downloaded fonts to woff/woff2 for better performance.
- [Meaningful Commits](https://blog.devgenius.io/make-a-meaningful-git-commit-message-with-semantic-commit-message-b39a79b13aa3) and [Git Commit Conventions](https://www.conventionalcommits.org/en/v1.0.0/) - These articles taught me how to make better commits (as seen in my commits in this project repository)
- [Mobbin](https://mobbin.com/) - This library of designs helped me gather ideas, which led to the final design of this project.

## Author

- Github - [jacobtitong](https://github.com/jacobtitong)
- Frontend Mentor - [@jacobtitong](https://www.frontendmentor.io/profile/jacobtitong)

## Acknowledgments

Credits to [greptile.com](https://www.greptile.com/blog) for giving me a reference to design this project in Figma.
