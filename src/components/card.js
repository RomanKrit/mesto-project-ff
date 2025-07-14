export function removeCard(cardNode) {
  cardNode.remove();
}

export function toggleLike(button) {
  button.classList.toggle("card__like-button_is-active");
}

export function generateCard(
  title,
  imageUrl,
  handleRemove,
  handleLikeToggle,
  handleImageClick
) {
  const template = document.querySelector("#card-template").content;
  const newCard = template.querySelector(".card").cloneNode(true);
  const imageElement = newCard.querySelector(".card__image");

  imageElement.src = imageUrl;
  imageElement.alt = title;
  newCard.querySelector(".card__title").textContent = title;

  const removeBtn = newCard.querySelector(".card__delete-button");
  removeBtn.addEventListener("click", () => {
    handleRemove(newCard);
  });

  imageElement.addEventListener("click", () => {
    handleImageClick(imageUrl, title);
  });

  const likeBtn = newCard.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => {
    handleLikeToggle(likeBtn);
  });

  return newCard;
}
