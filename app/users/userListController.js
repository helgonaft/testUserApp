'use strict';

angular.module('userApp.userList', ['ui.router', 'ngStorage'])
    .controller('UserListCtrl', function ($scope, $rootScope, $http, $sessionStorage, $state) {
        $scope.userListData = [];
        $scope.errorWhileGettingUserList = false;

        function getUserList() {
            var userList = $http({
                url: "https://api-employee-testing.herokuapp.com/api/v1/users",
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + $sessionStorage.userToken
                }
            });
            userList.then(
                function (response) {
                    if (response.status == 200) $scope.users = response.data.data;
                    return $scope.users;
                },
                function (error) {
                    $scope.errorWhileGettingUserList = error.statusText;
                    $scope.userListData = [];
                    return $scope.errorWhileDeletingUser;
                }
            );
        }
        getUserList();

        $scope.deleteUser = function (userId) {
            console.log(userId);
            var deleteUserById = $http({
                url: "https://api-employee-testing.herokuapp.com/api/v1/users/" + userId,
                method: "DELETE",
                headers: {
                    "Authorization": 'Bearer ' + $sessionStorage.userToken
                }
            });
            deleteUserById.then(
                function (response) {
                    if (response.data) {
                        $scope.deleteStatus = response.data.code;
                        //update users data after deleting
                        getUserList();
                    }
                },
                function (error) {
                    $scope.errorWhileDeletingUser = error.statusText;
                    alert($scope.errorWhileDeletingUser);
                }
            );

        }

    });
