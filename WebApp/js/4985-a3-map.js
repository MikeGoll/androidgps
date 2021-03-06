var dataManger = new Map(); // holds all locations.
var pinColors = ['http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
,'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
,'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
,'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
,'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
,'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
,'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png'
                ,'http://maps.google.com/mapfiles/ms/icons/orange-dot.png']; // all pin colours.

/**
  Author: Jamie Lee.
  Date: 2017-Mar-20.
  Prototype: ffunction initMap()
  Arguments: None.
  Purpose: Show all locations on the google map.
  */
  var pinColorIndex = 0;
  function initMap() {
    var latlng = new google.maps.LatLng(49.254908, -122.913864);
    var myOptions = {
      zoom: 10,
      center: latlng,
      mapTypeControl: true,
      mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
      navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map'), myOptions);
    dataManger.forEach(function (value, key, mapObj) {
      value.forEach(function (value, key, mapObj) {
        var infowindow = new google.maps.InfoWindow({
          content: '<b>' + value.get('title') + '</b>',
          size: new google.maps.Size(150, 50)
        });

        var pos = new google.maps.LatLng(Number(value.get('lat')), Number(value.get('lgn')));

        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: value.get('title'),
          icon: pinColors[pinColorIndex % pinColors.length]
        });

        google.maps.event.addListener(marker, 'mouseover', function () {
          infowindow.open(map, marker);
        });
        google.maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close(map, marker);
        });
        google.maps.event.addListener(marker, 'click', function () {
        // TODO: Do something when the marker is clicked.
        alert('clicked: position-' + marker.position + ', title-' + marker.title);
      });
      });
      pinColorIndex++;
    });
  }

  /*
  addMap(0, 0, 49.254908, -122.913864, 'clnt0-id0');
  addMap(0, 1, 50.254908, -122.913864, 'clnt0-id1');
  addMap(1, 0, 51.254908, -121.913864, 'clnt1-id0');
  addMap(1, 1, 51.254908, -120.913864, 'clnt1-id1');
  addMap(2, 0, 52.354908, -119.813864, 'clnt2-id0');
  addMap(2, 1, 52.454908, -120.713864, 'clnt2-id1');
  */

/**
  Author: Jamie Lee.
  Date: 2017-Mar-20.
  Prototype: function addMap(client, id, lat, lgn, title)
  Arguments:
              client - The ID of a client.
              id     - The Id of the client's data.
              lat    - The latitude of the data.
              lgn    - The longitude of the data.
              title  - The title for a marker.
  Purpose: Add one location data for a client that has 'client' ID.
  */
  function addMap(client, id, lat, lgn, title) {
    var mapData = new Map();
    mapData.set('lat', lat);
    mapData.set('lgn', lgn);
    mapData.set('title', title);

    var clientDataMap = dataManger.get(client);
    if (dataManger.get(client) == null) {
      clientDataMap = new Map();
    }

    clientDataMap.set(id, mapData);
    dataManger.set(client, clientDataMap);
  }