angular.module('userApp')
    .service('SessionService', [
        '$injector',
        function($injector) {

            this.checkAccess = function(event, toState) {
                var $scope = $injector.get('$rootScope'),
                    $sessionStorage = $injector.get('$sessionStorage');

                    // enter with authorization
                    if ($sessionStorage.user) {
                        $scope.$root.user = $sessionStorage.user;
                        return true;
                    } else {
                        console.log('user is not authorized');
                        return false;
                    }

            };
        }
    ]);