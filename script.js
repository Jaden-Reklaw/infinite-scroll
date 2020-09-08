//Create a helper function to assist in the creation of elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Select DOM elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 2;
const apiKey = 'API KEY HERE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Create Elements for Links & Photos, Add to the DOM
function displayPhotos() {
    // Run function to loop over items in photos array
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, { 
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Put <img> inside <a> and then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get Photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        //Catch error here
        console.log(error);
    }
}

// Check to see if scrolling near bottom of the page, then load more phots
window.addEventListener('scroll',() => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
       getPhotos();
       console.log('load more photos!');
   }
});

//On load
getPhotos();