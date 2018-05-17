'use strict';

angular.module('userApp.signIn', ['ui.router', 'ngStorage'])
.controller('SignInCtrl', function($scope, $rootScope, $http, $sessionStorage, $state, ENDPOINT_URI, JSON_CONTENT_TYPE, Notification) {
    $scope.loginData = {};
    $scope.loginError = false;
    $scope.errorReason = '';
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.login = function(){
        if((!$scope.loginData.email || !$scope.loginData.password)||($scope.loginData.email && $scope.loginData.email.length < 1) || ($scope.loginData.password && $scope.loginData.password < 1)){
            $scope.loginError = true;
            Notification.error('You need to fill in the form!');
        }
        else {
            var loginData = angular.toJson($scope.loginData);
            var auth = $http({
                url: ENDPOINT_URI + "auth/v1/sign-in",
                method: "POST",
                headers: {
                    'Content-Type' : JSON_CONTENT_TYPE
                },
                data: loginData
            });
            auth.then(
                function (response) {
                    if(response.status == 200){
                        $scope.userData = response.data.user;
                        $sessionStorage.user = $scope.userData;
                        $sessionStorage.userToken = response.data.access_token;
                        $scope.loginError = false;
                        $state.go('userList');
                    }else {
                        Notification.error('Something went wrong.');
                    }

                },
                function(error) {
                    $scope.loginError = true;
                    $scope.errorReason = 'Error: '+ error.statusText + '. ' + error.data.description;
                    Notification.error($scope.errorReason);
                    $sessionStorage.$reset();
                    $rootScope.user = null;
                }
            )
        }


    };

    $scope.logOut = function (event) {
        event.preventDefault();
        $sessionStorage.$reset();
        $rootScope.user = null;
        $state.go('login');
        Notification.warning('You are logged out now.');
    }
});