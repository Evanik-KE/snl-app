const wrapper =document.querySelector('.wrapper');
const loginLink =document.querySelector('.login-link');
const registerLink=document.querySelector('.register-link');
const btnPopup=document.querySelector('.btnLogin-popup');
const iconClose=document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

btnPopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
});


iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup');
});

// Initialize the map and Places service
var map;
var placesService;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -1.286389, lng: 36.817223 }, // Kenya's coordinates
        zoom: 8,
    });

    placesService = new google.maps.places.PlacesService(map);

    const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchInstitution);

}

function searchInstitution() {
    const institutionName = document.getElementById('institutionName').value;

    const request = {
        query: institutionName + ' student necessities in Kenya',
        fields: ['name', 'geometry'],
    };

    placesService.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            const place = results[0];
            const placeLocation = place.geometry.location;

            map.setCenter(placeLocation);
            map.setZoom(14); 

            new google.maps.Marker({
                position: placeLocation,
                map: map,
                title: place.name,
            });
        } else {
            alert('Place not found or an error occurred.');
        }
    });
}

