(function(){
    function configure ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/',
                views : {
                    '' : {
                        templateUrl: 'content.html'
                    }
                }
            })
        ;

        $urlRouterProvider.otherwise('/')
    };


    angular.module('app', [
        'ui.router',
        'bookmark.states'
    ])
    .config(configure)
    ;

}())
