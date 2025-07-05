// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Forms
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
const popUpNewCard = document.querySelector(".popup_type_new-card");
const popUpImageScreen = document.querySelector(".popup_type_image");
const popUpImage = document.querySelector(".popup__image");
const popUpCaption = document.querySelector(".popup__caption");

// Buttons
const buttonCreateCard = document.querySelector(".profile__add-button");
const buttonProfileEdit = document.querySelector(".profile__edit-button");

// Styles
const popUpClassOpened = "popup_is-opened";

// @todo: Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const titleElement = cardElement.querySelector(".card__title");

  // Установить значения
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  titleElement.textContent = cardData.name;

  // Слушатели
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

// Функция добавления карточки в DOM
function renderCard(cardData) {
  const card = createCard(cardData);
  cardList.prepend(card);
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция открытия изображения
function openImagePopup(link, name) {
  popUpImage.src = link;
  popUpImage.alt = name;
  popUpCaption.textContent = name;
  openPopup(popUpImageScreen);
}

// @todo: Функция открытия popup
function openPopup(popupElement) {
  popupElement.classList.add(popUpClassOpened);
  document.addEventListener("keydown", handleEscapeKey);
}

// @todo: Функция закрытия popup
function closePopup(popupElement) {
  popupElement.classList.remove(popUpClassOpened);
  document.removeEventListener("keydown", handleEscapeKey);
}

// Закрытие всех попапов по кнопке
document.querySelectorAll(".popup .popup__close").forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Закрытие popup по Escape
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Инициализация карточек
initialCards.forEach(renderCard);

// Открытие формы добавления карточки
buttonCreateCard.addEventListener("click", () => {
  openPopup(popUpNewCard);
});

// Обработка отправки новой карточки
function newCardSubmit(evt) {
  evt.preventDefault();

  const placeName = newCardForm.elements["place-name"].value;
  const imageUrl = newCardForm.elements.link.value;

  const newCardData = {
    name: placeName,
    link: imageUrl,
  };

  renderCard(newCardData);
  closePopup(popUpNewCard);
  newCardForm.reset();
}

newCardForm.addEventListener("submit", newCardSubmit);

// Открытие формы редактирования профиля
buttonProfileEdit.addEventListener("click", () => {
  openPopup(popupTypeEdit);
});

// Обработка формы редактирования профиля
function popUpEdit(evt) {
  evt.preventDefault();

  const name = editProfileForm.elements["name"].value;
  const description = editProfileForm.elements["description"].value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;

  closePopup(popupTypeEdit);
  editProfileForm.reset();
}

editProfileForm.addEventListener("submit", popUpEdit);
