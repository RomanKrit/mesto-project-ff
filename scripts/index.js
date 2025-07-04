// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// forms
const newCardForm = document.forms["new-place"];
const editProfileForm = document.forms["edit-profile"];

// @todo: DOM узлы

// Profile
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// List of cards
const cardList = document.querySelector(".places__list");
// Popups
const popupTypeEdit = document.querySelector(".popup_type_edit");
// New Card
const popUpNewCard = document.querySelector(".popup_type_new-card");

// Image showing
const popUpImageScreen = document.querySelector(".popup_type_image");
const popUpImage = document.querySelector(".popup__image");

// Buttons
const buttonCreateCard = document.querySelector(".profile__add-button");
const buttonProfileEdit = document.querySelector(".profile__edit-button");

// Styles
const popUpClassOpened = "popup_is-opened";

// @todo: Функция создания карточки

function createCard(cardData) {
  // Клонировать шаблон
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  // Установить значение вложеных элементов
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardList.append(cardElement);

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCard(cardElement);
    });

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
    });

  cardImage.addEventListener("click", ({ target }) => {
    const { src: link, alt: name } = target;

    popUpImageScreen.querySelector(".popup__caption").textContent = name;
    popUpImage.src = link;
    popUpImageScreen.classList.add(popUpClassOpened);
    document.addEventListener("keydown", handleEscapeKey);
  });
}

// Функции

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция скрытия popup
const closePopUp = () => {
  document.querySelector(".popup_is-opened").classList.remove(popUpClassOpened);
  document.removeEventListener("keydown", handleEscapeKey);
};

// @todo: Вывести карточки на страницу (Повесить слушателя событий)
initialCards.forEach(createCard);

// Listeners
buttonCreateCard.addEventListener("click", () => {
  popUpNewCard.classList.add(popUpClassOpened);
  document.addEventListener("keydown", handleEscapeKey);
});

document.querySelectorAll(".popup .popup__close").forEach((button) => {
  button.addEventListener("click", closePopUp);
});

function newCardSubmit(evt) {
  evt.preventDefault();

  const placeName = newCardForm.elements["place-name"].value;
  const imageUrl = newCardForm.elements.link.value;

  const newCardData = {
    name: placeName,
    link: imageUrl,
  };

  createCard(newCardData);

  popUpNewCard.classList.remove(popUpClassOpened);

  newCardForm.reset();
}

newCardForm.addEventListener("submit", newCardSubmit);

function popUpEdit(evt) {
  evt.preventDefault();

  const name = editProfileForm.elements["name"].value;
  const description = editProfileForm.elements["description"].value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;

  editProfileForm.reset();

  popupTypeEdit.classList.remove(popUpClassOpened);
}

buttonProfileEdit.addEventListener("click", () => {
  popupTypeEdit.classList.add(popUpClassOpened);
  document.addEventListener("keydown", handleEscapeKey);
});

editProfileForm.addEventListener("submit", popUpEdit);

// Функция для закрытия попапа по Escape
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopUp(openedPopup);
    }
  }
}
