(function(){

    function configure($stateProvider) {
        $stateProvider
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
            // get curent categoty for bookmarks
            .state('app.categories', {
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
            .state('app.categories.create', {
                url: '/create/',
                views: {
                    'bookmark-create': {
                        component: 'bookmarkCreate'
                    }
                }
            })
            // Edit bookmark
            .state('app.categories.edit', {
                url: 'edit/:bookmarkId',

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
