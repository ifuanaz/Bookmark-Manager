(function(){

    function configure($stateProvider) {
        $stateProvider
            .state('app.bookmarks', {
                url: 'bookmarks',
                views: {
                    'bookmarks': {
                        component: 'bookmarkList'
                    },
                    'categories': {
                        component: 'categoryList'
                    }
                }
            })
            // multi create bookmarks
            .state('app.bookmarks.multicreate', {
                url: '/create',
                views: {
                    'bookmark-create': {
                        component: 'bookmarskMultiCreate'
                    }
                }
            })
            // get current categoty for bookmarks
            .state('app.bookmark', {
                url: 'categories/:category',
                views: {
                    'bookmarks': {
                        component: 'bookmarkList'
                    },
                    'categories': {
                        component: 'categoryList'
                    }
                }
            })
            // Create bookmark
            .state('app.bookmark.create', {
                url: '/create',
                views: {
                    'bookmark-create': {
                        component: 'bookmarkCreate'
                    }
                }
            })
            // Edit bookmark
            .state('app.bookmark.edit', {
                url: '/edit/:bookmarkId',

                views: {
                    'bookmark-edit': {
                        component: 'bookmarkEdit'
                    }
                }
            })
        ;
    };


    angular.module('bookmark.states', [
        'bookmark.components',
        'category.components'
    ])
    .config(configure)
    ;

}());
