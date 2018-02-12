(function(){
    function configure ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/',
                views : {
                    '' : {
                        component: 'appComponent'
                        // templateUrl: 'content.html'
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


    let appComponent = {
        templateUrl: 'content.html',
        controller: function () {
            this.text = `We're watching for You :)`
        }
    }


    angular.module('app', [
        'ui.router',
        'category.states',
        'bookmark.states'
    ])
    .config(configure)
    .component('appComponent', appComponent)
    ;

}())
