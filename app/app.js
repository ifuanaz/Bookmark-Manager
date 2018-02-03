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
            .state('app.category', {
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
        'category.states',
        'bookmark.states'
    ])
    .config(configure)
    ;

}())
