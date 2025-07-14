export { showPopup, hidePopup };

function showPopup(popupElement) {
  if (!popupElement.classList.contains("popup_is-opened")) {
    popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscClose);
    popupElement.addEventListener("click", handleOverlayClick);
  }
}

function hidePopup(popupElement) {
  if (popupElement) {
    popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
    popupElement.removeEventListener("click", handleOverlayClick);
  }
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) {
      hidePopup(activePopup);
    }
  }
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    hidePopup(event.currentTarget);
  }
}
