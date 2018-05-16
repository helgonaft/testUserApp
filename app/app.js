'use strict';

angular.module('userApp', [
  'ui.router',
  'ngStorage',
  'userApp.signIn',
  'userApp.userList'
])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('login', {
            url: "/SignIn",
            templateUrl: "login/signInView.html"
          })
          .state('userlist', {
              url: "/user_list",
              templateUrl: "users/userListView.html",
              data: {
                  'checkLogin': true
              }
          });
          //$urlRouterProvider.otherwise('/login');
    })
    // .run(function ($rootScope, $location, AuthenticationService) {
    //
    //     // enumerate routes that don't need authentication
    //     var routesThatDontRequireAuth = ['/login'];
    //
    //     // check if current location matches route
    //     var routeClean = function (route) {
    //         return _.find(routesThatDontRequireAuth,
    //             function (noAuthRoute) {
    //                 return _.str.startsWith(route, noAuthRoute);
    //             });
    //     };
    //
    //     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //         // if route requires auth and user is not logged in
    //         if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
    //             // redirect back to login
    //             $location.path('/login');
    //         }
    //     });
    // });

    .run([
        '$rootScope', '$state', '$stateParams', 'SessionService',
        function ($rootScope, $state, $stateParams, SessionService) {

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.user = null;

            // check is user is authorized
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    SessionService.checkAccess(event, toState, toParams, fromState, fromParams);
                }
            );
        }
    ])
