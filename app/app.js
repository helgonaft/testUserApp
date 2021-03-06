'use strict';

angular.module('userApp', [
    'ui.router',
    'ngStorage',
    'userApp.signIn',
    'userApp.userList',
    'angularMoment',
    'ui-notification'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: "/sign_in",
                templateUrl: "login/signInView.html"
            })
            .state('userList', {
                url: "/user_list",
                templateUrl: "users/userListView.html"
            });
        $urlRouterProvider.otherwise('/sign_in');

    })
    .run(['$rootScope', '$transitions', '$state', '$sessionStorage', 'Notification', function ($rootScope, $transitions, $state, $sessionStorage, Notification) {
        $rootScope.state = $state;

        //check access before going to user list page
        $transitions.onBefore({to: 'userList', from: '*'}, function (trans) {
            var AuthService = trans.injector().get('SessionService');
            // if users are not authorized send them to login page
            if(!AuthService.checkAccess()){
                Notification.error('You have to login in order to see user list!');
                return $state.target("login");
            };
        });

    }]);




