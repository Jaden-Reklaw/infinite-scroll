//Select DOM elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

//Vars to check if images are ready to load
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let photosArray = [];

// Unsplash API
let count = 5; //initial loading of 5 images on the page to help performance
const apiKey = 'API KEY HERE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Create a helper function to assist in the creation of elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Check if all images were loaded
function imageLoaded() {
    console.log('images loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
        //To improve performance the first count is 5 but then goes up to 15 to load more images
        count = 15;
    }
}

//Create Elements for Links & Photos, Add to the DOM
function displayPhotos() {
    //Reset imagesLoaded to 0 so if statement in imageLoaded() is correct each time the pages gets to the bottom
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
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

        // Event Listener, check when photos are done loading
        img.addEventListener('load', imageLoaded);
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
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
       ready = false;
       getPhotos();
       console.log('load more photos!');
   }
});

//On load
getPhotos();