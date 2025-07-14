import { generateCard, removeCard, toggleLike } from "./components/card.js";
import { initialCards } from "./components/cards.js";
import { showPopup, hidePopup } from "./components/modal.js";
import "./pages/index.css";

const cardsContainer = document.querySelector(".places__list");
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const cardForm = document.querySelector('.popup__form[name="new-place"]');
const titleElement = document.querySelector(".profile__title");
const descElement = document.querySelector(".profile__description");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descInput = document.querySelector(".popup__input_type_description");
const addButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector(".popup_type_new-card");
const titleInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const closeButtons = document.querySelectorAll(".popup__close");
const imagePopup = document.querySelector(".popup_type_image");
const imageElement = imagePopup.querySelector(".popup__image");
const captionElement = imagePopup.querySelector(".popup__caption");

editButton.addEventListener("click", () => {
  nameInput.value = titleElement.textContent;
  descInput.value = descElement.textContent;
  showPopup(editPopup);
});

addButton.addEventListener("click", () => {
  showPopup(cardPopup);
});

closeButtons.forEach((btn) => {
  const relatedPopup = btn.closest(".popup");
  btn.addEventListener("click", () => {
    if (relatedPopup) {
      hidePopup(relatedPopup);
    }
  });
});

function handleProfileSubmit(e) {
  e.preventDefault();

  titleElement.textContent = nameInput.value;
  descElement.textContent = descInput.value;
  hidePopup(editPopup);
}

function previewImage(src, text) {
  imageElement.src = src;
  imageElement.alt = text;
  captionElement.textContent = text;
  showPopup(imagePopup);
}

function handleCardSubmit(e) {
  e.preventDefault();

  const cardTitle = titleInput.value;
  const imageLink = linkInput.value;

  const card = generateCard(
    cardTitle,
    imageLink,
    removeCard,
    toggleLike,
    previewImage
  );

  insertCard(card, true);
  cardForm.reset();
  hidePopup(cardPopup);
}

function insertCard(cardNode, toTop) {
  if (toTop) {
    cardsContainer.prepend(cardNode);
  } else {
    cardsContainer.append(cardNode);
  }
}

initialCards.forEach((item) => {
  const readyCard = generateCard(
    item.name,
    item.link,
    removeCard,
    toggleLike,
    previewImage
  );
  insertCard(readyCard);
});

profileForm.addEventListener("submit", handleProfileSubmit);
cardForm.addEventListener("submit", handleCardSubmit);
