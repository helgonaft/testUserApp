'use strict';

angular.module('userApp.userList', ['ui.router', 'ngStorage'])
    .controller('UserListCtrl', function ($scope, $rootScope, $http, $sessionStorage, ENDPOINT_URI, JSON_CONTENT_TYPE, Notification) {
        $scope.users = [];
        $scope.newUserData = {};
        $scope.errorWhileGettingUserList = false;
        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        $scope.passwordMinLength = 5;
        $scope.loading = true;
        $scope.pageSize = 10;

        $scope.getUserList = function(pageSizeParam, pageNumParam) {
            var pageNumber = 1;
            if(pageSizeParam) {
                var pazeSizeArg = parseInt(pageSizeParam, 10);
                $scope.pageSize = pazeSizeArg > 0 ? pazeSizeArg : 10;
            }
            if(pageNumParam){
                pageNumber = parseInt(pageNumParam, 10);
                $scope.page = pageNumber > 0 ? pageNumber : 1;
            }

            $scope.loading = true;
            var userList = $http({
                url: ENDPOINT_URI+ "api/v1/users",
                method: "GET",
                headers: {
                    "Content-Type": JSON_CONTENT_TYPE,
                    "Authorization": 'Bearer ' + $sessionStorage.userToken
                },
                params: {
                    "page": pageNumber,
                    "pageSize" : $scope.pageSize
                }
            });
            userList.then(
                function (response) {
                    $scope.users = response.data.data;
                    $scope.pagination = response.data.pagination;
                    $scope.loading = false;
                    createPagination($scope.pagination);
                    return $scope.users;
                },
                function (error) {
                    $scope.errorWhileGettingUserList = error.statusText;
                    $scope.users= [];
                    Notification.error($scope.errorWhileDeletingUser);
                    $scope.loading = false;
                    return $scope.errorWhileDeletingUser;
                }
            );
        };
        $scope.getUserList();

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
                        Notification.success('User with id ' + userId + ' was successfully deleted!');
                        //update users data after deleting
                        $scope.getUserList($scope.pageSize);
                    }
                },
                function (error) {
                    $scope.errorWhileDeletingUser = error.statusText;
                    Notification.error('Error while deleting: ' + $scope.errorWhileDeletingUser);
                }
            );

        };

        $scope.createUser = function() {
            var formIsFilled = true;
            if(!$scope.newUserData.email || !$scope.newUserData.name || !$scope.newUserData.password){
                formIsFilled = false;
                Notification.error('You need to fill in the form!');
            }
            if(formIsFilled){
                var createUserData = angular.toJson($scope.newUserData);
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
                        if (response.status == 201) {
                            $scope.createdUser = response.data;
                            $('#createUserModal').modal('hide');
                            Notification.success('New user ' +  $scope.createdUser.name + ' was successfully created!');
                            //update users data after creating new user
                            $scope.getUserList($scope.pageSize);
                            return $scope.createdUser;
                        }
                    },
                    function (error) {
                        $scope.errorWhileCreatingUser = error.statusText;
                        $scope.errorWhileCreatingUser_description = error.data.description;
                        $('#createUserModal').modal('hide');
                        Notification.error('Error while creating new user: ' +  $scope.errorWhileCreatingUser + '. Error description: ' + $scope.errorWhileCreatingUser_description);
                        return $scope.errorWhileCreatingUser;
                    }
                );
            }
        };

        function createPagination(data){
            $scope.pagesAmount = new Array(data.pageCount);
        }

    });
