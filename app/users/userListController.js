'use strict';

angular.module('userApp.userList', ['ui.router', 'ngStorage'])
    .controller('UserListCtrl', function ($scope, $rootScope, $http, $sessionStorage, ENDPOINT_URI, JSON_CONTENT_TYPE) {
        $scope.users = [];
        $scope.newUserData = {};
        $scope.errorWhileGettingUserList = false;

        function getUserList() {
            var userList = $http({
                url: ENDPOINT_URI+ "api/v1/users",
                method: "GET",
                headers: {
                    "Content-Type": JSON_CONTENT_TYPE,
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
                    $scope.users= [];
                    return $scope.errorWhileDeletingUser;
                }
            );
        }
        getUserList();

        $scope.deleteUser = function (userId) {
            var deleteUserById = $http({
                url: ENDPOINT_URI + "api/v1/users/" + userId,
                method: "DELETE",
                headers: {
                    "Authorization": 'Bearer ' + $sessionStorage.userToken
                }
            });
            deleteUserById.then(
                function (response) {
                    if (response.data) {
                        $scope.deleteStatus = response.data.code;
                        alert('User with id ' + userId + ' was successfully deleted!');
                        //update users data after deleting
                        getUserList();
                    }
                },
                function (error) {
                    $scope.errorWhileDeletingUser = error.statusText;
                    alert('Error while deleting: ' + $scope.errorWhileDeletingUser);
                }
            );

        }

        $scope.createUser = function() {
            var createUserData = angular.toJson($scope.newUserData);
            console.log(createUserData);
            var createNewUser = $http({
                url: ENDPOINT_URI + "api/v1/users",
                method: "POST",
                headers: {
                    "Content-Type": JSON_CONTENT_TYPE,
                    "Authorization": 'Bearer ' + $sessionStorage.userToken
                },
                data: createUserData
            });
            createNewUser.then(
                function (response) {
                    console.log(response);
                    if (response.status == 201) {
                        $scope.createdUser = response.data;
                        $('#createUserModal').modal('hide');
                        alert('New user ' +  $scope.createdUser.name + ' was successfully created!');
                        //update users data after creating new user
                        getUserList();
                        return $scope.createdUser;
                    }
                },
                function (error) {
                    console.log(error);
                    $scope.errorWhileCreatingUser = error.statusText;
                    $scope.errorWhileCreatingUser_description = error.data.description;
                    $('#createUserModal').modal('hide');
                    alert('Error while creating new user: ' +  $scope.errorWhileCreatingUser + '. Error description: ' + $scope.errorWhileCreatingUser_description);
                    return $scope.errorWhileCreatingUser;
                }
            );

        }

    });
