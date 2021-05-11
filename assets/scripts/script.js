/* Coordinates for GoogleMaps */
const citiesCoordinates = {
  'Los Angeles': { lat: 34.052235, lng: -118.243683 },
  'New York': { lat: 40.730610, lng: -73.935242 },
  'Boston': { lat: 42.361145, lng: -71.057083 },
  'Detroit': { lat: 42.331429, lng: -83.045753 }
}
 
let marker, map;

/* HEADER SCROLL */
const headerScroll = () => {
  const header = document.getElementById('js-header');

  window.pageYOffset > 0 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
}

/* MOBILE MENU */
const mobileMenu = () => {
  if (window.innerWidth > 767) return;

  const body = document.querySelector('body');
  const burgerBtn = document.getElementById('burger-button');
  const navMenu = document.getElementById('burger-menu');

  burgerBtn.onclick = function() {
    body.classList.toggle('overflow-hidden');
    this.classList.toggle('opened');
    navMenu.classList.toggle('opened');
  }
}

/* BANNER SWIPER */
const bannerSwiper = new Swiper('.swiper-container-banner', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true
  },
  on: {
    transitionStart: function () {
      youtubeBackground();
    },
  },
});

/* SELECT ITEM */
const selectItem = (items) => {
  const itemsList = document.querySelectorAll(items);
  if (!itemsList) return;

  itemsList.forEach((el, key) => {
    el.addEventListener('click', function () {
      el.classList.add('active');

      if (el.querySelector('[data-city]')) {
        const city = el.querySelector('[data-city]').getAttribute('data-city');
        console.log(city);
        
        changeMarkerPos(citiesCoordinates[city]);
      }
      

      itemsList.forEach((ell, els) => {
        if(key !== els) {
          ell.classList.remove('active');
        }
      });
    });
 });
}

/* YOUTUTBE BACKGROUND */
const youtubeBackground = () => {
  // Get element
  let youtubeEmbedElement = document.querySelector(".swiper-slide-active .youtubeEmbed");

  // Add YouTube API script
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let player;
  let videoId = youtubeEmbedElement.dataset.videoId;
  let startSeconds = 184;
  let endSeconds = 210;

  onYouTubeIframeAPIReady = () => {
    player = new YT.Player(youtubeEmbedElement.id, {
      videoId: videoId, // YouTube Video ID
      playerVars: {
        autoplay: 1, // Auto-play the video on load
        autohide: 1, // Hide video controls when playing
        disablekb: 1,
        controls: 0, // Hide pause/play buttons in player
        showinfo: 0, // Hide the video title
        modestbranding: 1, // Hide the Youtube Logo
        loop: 1, // Run the video in a loop
        fs: 0, // Hide the full screen button
        rel: 0,
        enablejsapi: 1,
        start: startSeconds,
        end: endSeconds
      },
      events: {
        onReady: (e) => {
          e.target.mute();
          e.target.playVideo();
        },
        onStateChange: (e) => {
          document.querySelector(".swiper-slide-active .youtubeEmbed").classList.add("loaded");

          if (e.data === YT.PlayerState.ENDED) {
            // Loop from starting point
            player.seekTo(startSeconds);
          }
        }
      }
    });
  };
}

/* INITIALIZE FUNCTIONS ON WINDOW LOAD */
window.onload = () => {
  mobileMenu();
  headerScroll();
  youtubeBackground();
  selectItem('.contacts__navigation-item');
  selectItem('.header__menu-item');
}

/* INITIALIZE FUNCTIONS ON WINDOW SCROLL */
window.onscroll = () => {
  headerScroll()
}

// Initialize and add the map
function initMap() {
    // The map, centered 
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: citiesCoordinates['New York'],
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#aaeaaf"
          },
          {
            "visibility": "on"
          },
          {
            "weight": 4.5
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
    
    
  }
);
  marker = new google.maps.Marker({
    position: citiesCoordinates['New York'],
    map,
    icon: './assets/images/icons/map-marker.png'
  });
}

function changeMarkerPos(location) {
  const { lat, lng } = location;
  myLatLng = new google.maps.LatLng(lat, lng)
  marker.setPosition(myLatLng);
  map.panTo(myLatLng);
}





//Smooth scroll
const navbarMenu = document.querySelector(".header__menu");
const headerHeight = document.querySelector(".header").offsetHeight;
const navbarLinks = document.querySelectorAll(".header__menu-item a");
const navbarMenu_footer = document.querySelector(".footer__menu");
const navbarLinks_footer = document.querySelectorAll(".footer__menu-item a");



// navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinkClick));

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navbarLinkClick);
}
for (let i = 0; i < navbarLinks_footer.length; i++) {
  navbarLinks_footer[i].addEventListener("click", navbarLinkClick);
}
function navbarLinkClick(event) {
  smoothScroll(event); // Call the "smoothScroll" function
}

function smoothScroll(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href")==="#" ? "header" : event.currentTarget.getAttribute("href");
  const targetPosition = document.querySelector(targetId).offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition - headerHeight;
  const duration = 1000;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    // window.scrollTo(0, distance*(progress/duration) + startPosition);
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};
