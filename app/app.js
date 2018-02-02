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
            // home state
            .state('app.home', {
                url: '',
                views: {
                    'bookmarks': {
                        component: 'bookmarkList'
                    },
                    'categories': {
                        component: 'categoryList'
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
