const leftContainer = document.querySelector('.left-side');
const rightContainer = document.querySelector('.right-side');
const textContainer = document.querySelector('.text-container');
const imgContainer = document.querySelector('.img-container');

const imgApi = 'https://picsum.photos/v2/list';

/**
 * This function creates a separate image container for image preview section. Each <img> tag is placed in a parent <div> container.
 * 'id' attribute is set to a parent <div> element. Event listener is placed on <img> tag.
 * @param {*} object 
 */
const addPreviewImg = (object) => {
    let div = document.createElement('div');
    let img = document.createElement('img');

    img.classList.add('preview-box-img');
    img.src = object.download_url;
    img.addEventListener('click', getImgId);

    div.classList.add('preview-box');
    div.setAttribute('id', object.id);
    div.appendChild(img);
    leftContainer.appendChild(div);
}

/**
 * This function gets the 'id' of an image that was clicked from event.target. Then it loops through image database, looking for 'id' match.
 * If 'id' matches, it takes image object, and calls renderImg() function.
 */
const getImgId = () => {
    const imgToShow = event.target.parentNode.getAttribute("id");

    let emptyImgObject = { 'author': '', 'height': '', 'width': '' };

    fetch(imgApi)
        .then(response => response.json())
        .then(result => result.forEach(element => {
            if (element.id === imgToShow) {
                emptyImgObject.author = element.author;
                emptyImgObject.height = element.height;
                emptyImgObject.width = element.width;
                emptyImgObject.url = element.download_url;
                renderImg(emptyImgObject);
            }
        }))
        .catch(err => console.log(err));
}

/**
 * This function takes in image object and renders enlarged image container inside web page right secion.
 * @param {*} imgObject 
 */
const renderImg = (imgObject) => {
    textContainer.innerHTML = '';
    imgContainer.innerHTML = '';
    textContainer.innerHTML = `Author: ${imgObject.author}, width: ${imgObject.width}px, height: ${imgObject.height}px`;

    let img = document.createElement('img');
    img.classList.add('show-box-img');
    img.src = imgObject.url;
    imgContainer.appendChild(img);
}

/**
 * This function takes given API endpoint, loops through each of the image object, and renders that image to the preview section.
 */
const renderPreviewSection = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(result => result.forEach(obj => addPreviewImg(obj)))
        .catch(err => console.log(err));
}

renderPreviewSection(imgApi);

