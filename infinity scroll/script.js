'use strict';
//API
const count = 5;
const apiKey = `KzgK9QRaifCWer1I5c5NhB3uSsj8KNuJ2hd4bYo7BZo`;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Get Photos from API

const imageContainer = document.querySelector('.image-container');

const loader = document.querySelector('.loader');

let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded=== totalImages)
    {
        ready = true;
        loader.hidden = true;

}    
}

function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
//create elements for links
function displayPhotos() {
    totalImages = photoArray.length;

    photoArray.forEach((photo) => {

        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',

        });
        
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        item.appendChild(img);
        imageContainer.appendChild(item);
        imageLoaded();

    });
}


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();

        displayPhotos();

    } catch (error) { 
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        imagesLoaded = 0;
        getPhotos();
        
    }
})
getPhotos();
// displayPhotos()