angular.module('starter.controllers', [])

  .controller('MapCtrl', function ($scope, $state, $cordovaGeolocation, $cordovaBackgroundGeolocation) {

    $scope.lat = 0;
    $scope.lng = 0;

    var options = {timeout: 10000, enableHighAccuracy: true};

    $scope.start = function () {
      console.log('inside start tracking');

      // Background tracking
      // var config = {
      //   desiredAccuracy: 0,
      //   stationaryRadius: 20,
      //   distanceFilter: 10,
      //   debug: true,
      //   interval: 2000
      // };
      // document.addEventListener("deviceready", function () {
      //   console.log('device ready hai');
      //   $cordovaBackgroundGeolocation.configure(config)
      //     .then(
      //       null,
      //       function (error) {
      //         console.log(error);
      //       },
      //       function (location) {
      //         console.log('BackgroundLocation: (' + location.latitude +
      //           ', ' + location.longitude + ')');
      //
      //         $scope.lat = location.latitude;
      //         $scope.lng = location.longitude;
      //
      //       }
      //     );
      //
      //
      //   // Turn ON the background-geolocation system.
      //   $cordovaBackgroundGeolocation.start();
      // //
      // }, false);
      //
      // Foreground tracking
      var options = {
        frequency: 3000,
        enableHighAccuracy: false
      };
      $scope.watch_position = $cordovaGeolocation.watchPosition(options);
      console.log('Watching with ID: ', $scope.watch_position.watchID);
      $scope.watch_position
        .then(
          null,
          function (error) {
          console.log(error);
          },
          function (position) {
          console.log(position);
          $scope.lat = position.coords.latitude;
          $scope.lng = position.coords.longitude;
          });
    };
    // $scope.watch_position.clearWatch();

    $scope.stop = function () {
      console.log('Inside stop, watchID: ', $scope.watch_position.watchID);
      $cordovaGeolocation.clearWatch($scope.watch_position.watchID);
        // .then(function (result) {
        //   console.log('Tracking ruk gai.');
        // }, function (error) {
        //   console.log('Tracking rukne mein error aa rahi hai: ', error);
        // });
      // $cordovaBackgroundGeolocation.stop();
    };

    $cordovaGeolocation.getCurrentPosition(options)
      .then(function (position) {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        console.log('created google map');
      }, function (error) {
        console.error(error);
      });
  });
