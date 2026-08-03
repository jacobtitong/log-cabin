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
