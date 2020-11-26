jQuery(document).ready(function($){
  	function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie only
	}

	function unloadScrollBars() {
	    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
	    document.body.scroll = "no"; // ie only
	}
  	$('#beerModalTrigger').on('click', unloadScrollBars);
  	$('#beerModalClose').on('click',reloadScrollBars);
  //Map JS 
  //set your google maps parameters
  // var latitude = 51.5255069,
  //   longitude = -0.0836207,
  var  map_zoom = 11;
  var locations = [
      ['Pintxos', 14.4073187, 120.9272305, 4],
      ['Bugsys Alabang', 14.4221452, 121.031166, 5],
      ['The Palms Country Club', 14.4108595, 121.0326004, 3],
      ['Union Jack Tavern', 14.4174281, 121.0381309, 2],
      ['Buona Vita', 14.4245752, 121.024752, 1],
      ['Nomads Sports Club', 14.5012464,121.0167859,6],
      ['Bugsys BGC', 14.5514072,121.042138, 7],
      ['Z Hostel Makati',14.5637793,121.0291887,8],
      ['Le Cafe Curieux Makati',14.5628002,121.027069,9],
      ['Bugsys Pasig',14.5845062,121.0652639,10]
    ];


  //google map custom marker icon - .png fallback for IE11
  var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
  var marker_url = ( is_internetExplorer11 ) ? 'img/location/cd-icon-location.png' : 'img/location/cd-icon-location.svg';
    
  //define the basic color of your map, plus a value for saturation and brightness
  var main_color = '#2d313f',
    saturation_value= -20,
    brightness_value= 5;

  //we define here the style of the map
  var style= [ 
    {
      //set saturation for the labels on the map
      elementType: "labels",
      stylers: [
        {saturation: saturation_value}
      ]
    },  
      { //poi stands for point of interest - don't show these lables on the map 
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {visibility: "off"}
      ]
    },
    {
      //don't show highways lables on the map
          featureType: 'road.highway',
          elementType: 'labels',
          stylers: [
              {visibility: "off"}
          ]
      }, 
    {   
      //don't show local road lables on the map
      featureType: "road.local", 
      elementType: "labels.icon", 
      stylers: [
        {visibility: "off"} 
      ] 
    },
    { 
      //don't show arterial road lables on the map
      featureType: "road.arterial", 
      elementType: "labels.icon", 
      stylers: [
        {visibility: "off"}
      ] 
    },
    {
      //don't show road lables on the map
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {visibility: "off"}
      ]
    }, 
    //style different elements on the map
    { 
      featureType: "transit", 
      elementType: "geometry.fill", 
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    }, 
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "poi.government",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "poi.sport_complex",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "poi.attraction",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "poi.business",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "transit",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "landscape",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
      
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    }, 
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { hue: main_color },
        { visibility: "on" }, 
        { lightness: brightness_value }, 
        { saturation: saturation_value }
      ]
    }
  ];
    
  //set google map options
  var map_options = {
        center: new google.maps.LatLng(14.5264257, 120.9912885),
        zoom: map_zoom,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style,
  };
    //inizialize the map
  var map = new google.maps.Map(document.getElementById('google-container'), map_options);

  var infowindow = new google.maps.InfoWindow();
  //add a custom marker to the map          
  // var marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(latitude, longitude),
  //     map: map,
  //     visible: true,
  //   icon: marker_url,
  // });
  var marker, i;
  for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: marker_url,
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
  }
  //add custom buttons for the zoom-in/zoom-out on the map
  function CustomZoomControl(controlDiv, map) {
    //grap the zoom elements from the DOM and insert them in the map 
      var controlUIzoomIn= document.getElementById('cd-zoom-in'),
        controlUIzoomOut= document.getElementById('cd-zoom-out');
      controlDiv.appendChild(controlUIzoomIn);
      controlDiv.appendChild(controlUIzoomOut);

    // Setup the click event listeners and zoom-in or out according to the clicked element
    google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
        map.setZoom(map.getZoom()+1)
    });
    google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
        map.setZoom(map.getZoom()-1)
    });
  }

  var zoomControlDiv = document.createElement('div');
  var zoomControl = new CustomZoomControl(zoomControlDiv, map);

    //insert the zoom div on the top left of the map
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv); 
});