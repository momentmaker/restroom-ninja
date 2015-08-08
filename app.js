if (Meteor.isServer) {
  Meteor.publish('markers', function() {
    return Markers.find();
  });
}

if (Meteor.isClient) {
  Meteor.startup(function() {
    Tracker.autorun(function () {
      var geo = Geolocation.latLng();
      Session.set('geo', geo);
    });
    GoogleMaps.load();
  });

  Meteor.subscribe('markers');

  Template.map.helpers({
    mapOptions: function() {
      // debugger
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(Session.get('geo').lat, Session.get('geo').lng),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      }
    }
  });

}
