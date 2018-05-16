'use strict';

angular.module('userApp.signIn', ['ui.router', 'ngStorage'])
.controller('SignInCtrl', function($scope, $rootScope, $http, $sessionStorage, $state) {
    $scope.loginData = {};
    $scope.loginError = false;

    $scope.login = function(){
        var loginData = angular.toJson($scope.loginData);
        console.log(loginData);
        var auth = $http({
            url: "https://api-employee-testing.herokuapp.com/auth/v1/sign-in",
            method: "POST",
            data: loginData
        });
        auth.then(
            function (response) {
                console.log(response);
                if(response.status == 200){
                    $scope.userData = response.data.user;
                    $sessionStorage.user = $scope.userData;
                    $sessionStorage.userToken = response.data.access_token;
                    $scope.loginError = false;
                    $state.go('userList');
                }

            },
            function(error) {
                console.error(error);
                $scope.loginError = true;
                $scope.errorReason = 'Error: '+ error.statusText + '. ' + error.data.description;
                $sessionStorage.$reset();
                $rootScope.user = null;
            }
        )

    };

    $scope.logOut = function (event) {
        event.preventDefault();
        $sessionStorage.$reset();
        $rootScope.user = null;
        $state.go('login');
    }
});