if (Meteor.isServer) {
  Meteor.publish('markers', function() {
    return Markers.find();
  });
}

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Meteor.subscribe('markers');

  Template.map.helpers({
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(44.525049, -110.83819),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };
      }
    }
  });

}
