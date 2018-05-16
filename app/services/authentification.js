angular.module('userApp')
    .service('SessionService', [
        '$injector',
        function($injector) {
            "use strict";

            this.checkAccess = function(event, toState) {
                var $scope = $injector.get('$rootScope'),
                    $sessionStorage = $injector.get('$sessionStorage');

                if (toState.data !== undefined) {
                    if (toState.data.checkLogin !== undefined && toState.data.checkLogin) {
                        // если нужно, выполняйте здесь какие-то действия
                        // перед входом без авторизации
                    }
                } else {
                    // вход с авторизацией
                    if ($sessionStorage.user) {
                        $scope.$root.user = $sessionStorage.user;
                    } else {
                        // if user is not authorized send them to login page
                        event.preventDefault();
                        $scope.$state.go('login');
                    }
                }
            };
        }
    ]);