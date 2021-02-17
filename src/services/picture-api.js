function fetchImages({ pictureName, page }) {
  return fetch(
    `https://pixabay.com/api/?key=18692705-ed4727d48f1212ef902c664a7&q=${pictureName}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Нет картинки по названию ${pictureName}`));
  });
}

export default fetchImages;
