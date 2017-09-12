angular.module('starter.controllers', [])

.controller('MapCtrl', function ($scope, $state, $cordovaGeolocation, PaypalService, $ionicPopup) {

  $scope.lat = 0;
  $scope.lng = 0;

  $scope.total = function () {
    return 0.01;
  };

  $scope.start = function () {
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

  $scope.stop = function () {
    console.log('Inside stop, watchID: ', $scope.watch_position.watchID);
    $cordovaGeolocation.clearWatch($scope.watch_position.watchID);
  };

  $scope.payPal = function () {
    PaypalService.initPaymentUI().then(function () {
      console.log('paypal ui initiated');
      PaypalService.makePayment($scope.total(), "Total").then(function (value) {
        console.log(JSON.stringify(value));
        var alertPopUp = $ionicPopup.alert({
          title: 'Payment Successful',
          template: 'Payment ID: ' + value['response']['id'] + '\nPayment Status: ' +
                    value['response']['state']
        });
      }, function (error) {
        console.error(error);
      });
    }, function (error) {
      console.error(error);
    });
  };
});
