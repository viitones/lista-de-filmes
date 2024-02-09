const inputElement = document.querySelector(
  ".new-film-input");

const selectElement = document.querySelector(".film-genres");

const addfilmButton = document.querySelector(
  ".add-film-btn");

const filmsContainer = document.querySelector('.films-container');

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddFilm = () => {
  const isInputValid = validateInput();

  if (!isInputValid) {
    return inputElement.classList.add("error");
  }

  const filmItemContainer = document.createElement('div');
  
  filmItemContainer.classList.add("film-item");
  filmItemContainer.classList.add(getSelectedColumn());
  // const dateCreated = Date.now();
  // filmItemContainer.setAttribute('id', dateCreated);


  const filmContent = document.createElement('p');
  filmContent.innerText = inputElement.value;

  const starsBox = document.createElement('div');
  starsBox.classList.add("stars");

  const iconsBox = document.createElement('div');
  iconsBox.classList.add("icons");

  for (let c=1; c<=5; c++) {
    const starIcon = document.createElement('i');
    starIcon.classList.add("star", "fa-solid", "fa-star");
    starIcon.setAttribute("id", "star"+c);
    starIcon.addEventListener('click', () => handleRatingClick(starsBox, starIcon.id));
    starsBox.appendChild(starIcon);
  }
  
  const watchedItem = document.createElement('i');
  watchedItem.classList.add("fas", "fa-check", "watched-btn", "icon");
  watchedItem.addEventListener('click', () => handleWatchedClick(filmItemContainer));
  
  const deleteItem = document.createElement('i');
  deleteItem.classList.add("fas", "fa-times", "delete-btn", "icon");
  deleteItem.addEventListener('click', () => handleDeleteClick(filmItemContainer));

  filmItemContainer.appendChild(filmContent);
  filmItemContainer.appendChild(starsBox);
  iconsBox.appendChild(watchedItem);
  iconsBox.appendChild(deleteItem);
  filmItemContainer.appendChild(iconsBox);

  const selectedColumn = document.querySelector(`.${getSelectedColumn()}.film-list`);
  selectedColumn.appendChild(filmItemContainer);
  
  inputElement.value = "";
  updateLocalStorage();

};

const getSelectedColumn = () => {
  return `${selectElement.value}`
}

const handleRatingClick = (starsBox, starId) => {
  const userRating = starId.slice(-1);
  const stars = starsBox.childNodes;

  if(stars[userRating-1].classList.contains("active")) {
    for(let counter=1;counter<=5; counter++){
      stars[counter-1].classList.remove("active");
    };
    updateLocalStorage();
    return
  };

  for(let counter=1; counter<=5; counter++){
    if (counter <= userRating) {
      stars[counter-1].classList.add("active");
    };
    if (counter > userRating) {
      stars[counter-1].classList.remove("active");
    };
  }

  updateLocalStorage();
}

const handleWatchedClick = (filmItemContainer) => {
  filmItemContainer.classList.toggle("watched");

  updateLocalStorage();
};


const handleDeleteClick = (filmItemContainer) => {
  filmItemContainer.remove();

  updateLocalStorage();
};


const handleInputChange = () => {
  const isInputValid = validateInput();
  
  if(isInputValid){
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const everyFilm = [];
  const allColumnsElement = document.getElementsByClassName("film-list");

  for (const item of allColumnsElement[0].childNodes) {
    const starsElement = item.childNodes[1];
    let numberOfStars = 0;

    for(star of starsElement.childNodes) {
      if (star.classList.contains("active")) {numberOfStars++};
    };

    everyFilm.push(
      {
      platform: item.classList[1],
      description: item.innerText,
      isWatched: item.classList.contains("watched"),
      rating: numberOfStars
      }
    );
  };

  for (const item of allColumnsElement[1].childNodes) {
    const starsElement = item.childNodes[1];
    let numberOfStars = 0;

    for(star of starsElement.childNodes) {
      if (star.classList.contains("active")) {numberOfStars++};
    };

    everyFilm.push(
      {
      platform: item.classList[1],
      description: item.innerText,
      isWatched: item.classList.contains("watched"),
      rating: numberOfStars
      }
    );
  };

  for (const item of allColumnsElement[2].childNodes) {
    const starsElement = item.childNodes[1];
    let numberOfStars = 0;

    for(star of starsElement.childNodes) {
      if (star.classList.contains("active")) {numberOfStars++};
    };

    everyFilm.push(
      {
      platform: item.classList[1],
      description: item.innerText,
      isWatched: item.classList.contains("watched"),
      rating: numberOfStars
      }
    );
  };

  for (const item of allColumnsElement[3].childNodes) {
    const starsElement = item.childNodes[1];
    let numberOfStars = 0;

    for(star of starsElement.childNodes) {
      if (star.classList.contains("active")) {numberOfStars++};
    };

    everyFilm.push(
      {
      platform: item.classList[1],
      description: item.innerText,
      isWatched: item.classList.contains("watched"),
      rating: numberOfStars
      }
    );
  };

  localStorage.setItem(`films-list`, JSON.stringify(everyFilm));

};

addfilmButton.addEventListener("click", () => handleAddFilm());
inputElement.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    handleAddFilm();
  }
});

inputElement.addEventListener('change', () => handleInputChange());

(function getLocalStorage(){
  const storageFilms = JSON.parse(localStorage.getItem("films-list"));
  
  if (!storageFilms) return;

  for (const film of storageFilms) {
    const filmItemContainer = document.createElement('div');
  
    filmItemContainer.classList.add("film-item");
    filmItemContainer.classList.add(film.platform);
    if(film.isWatched) {
      filmItemContainer.classList.add("watched");
    };
    
    const filmContent = document.createElement('p');
    filmContent.innerText = film.description;
    
    const starsBox = document.createElement('div');
    starsBox.classList.add("stars");
  
    for (let c=1; c<=5; c++) {
      const starIcon = document.createElement('i');
      starIcon.classList.add("star", "fa-solid", "fa-star");
      if(film.rating >= c) {starIcon.classList.add("active")};
      starIcon.setAttribute("id", "star"+c);
      starIcon.addEventListener('click', () => handleRatingClick(starsBox, starIcon.id));
      starsBox.appendChild(starIcon);
    };

    const iconsBox = document.createElement('div');
    iconsBox.classList.add("icons");

    const watchedItem = document.createElement('i');
    watchedItem.classList.add("fas", "fa-check", "watched-btn", "icon");
    watchedItem.addEventListener('click', () => handleWatchedClick(filmItemContainer));
  
    const deleteItem = document.createElement('i');
    deleteItem.addEventListener('click', () => handleDeleteClick(filmItemContainer));
    deleteItem.classList.add("fas", "fa-times", "delete-btn", "icon");
    
    filmItemContainer.appendChild(filmContent);
    filmItemContainer.appendChild(starsBox);
    iconsBox.appendChild(watchedItem);
    iconsBox.appendChild(deleteItem);
    filmItemContainer.appendChild(iconsBox);
    // filmItemContainer.appendChild(deleteItem);
  
    const selectedColumn = document.querySelector(`.${film.platform}.film-list`);
    selectedColumn.appendChild(filmItemContainer);
  };
})();