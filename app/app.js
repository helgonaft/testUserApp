'use strict';

angular.module('userApp', [
    'ui.router',
    'ngStorage',
    'userApp.signIn',
    'userApp.userList'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "home/homeView.html"
            })
            .state('login', {
                url: "/sign_in",
                templateUrl: "login/signInView.html"
            })
            .state('userList', {
                url: "/user_list",
                templateUrl: "users/userListView.html"
            });
        //$urlRouterProvider.otherwise('/sign_in');
    })
    .run(['$rootScope', '$transitions', '$state', '$sessionStorage', function ($rootScope, $transitions, $state, $sessionStorage) {
        $rootScope.state = $state;

        //check access before going to user list page
        $transitions.onBefore({to: 'userList', from: '*'}, function (trans) {
            console.info(trans);
            var AuthService = trans.injector().get('SessionService');
            // if users are not authorized send them to login page
            if(!AuthService.checkAccess()){
                return $state.target("login");
            };
        });



    }]);




