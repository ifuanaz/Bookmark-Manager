(function(){
    function configure($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: '',
                views: {
                    'bookmarks': {
                        component: 'bookmarks'
                    },
                    'categories': {
                        component: 'categories'
                    }
                }
            })
            // get curent categoty for bookmarks
            .state('app.categories', {
                url: 'categories/:category',
                views: {
                    'bookmarks': {
                        component: 'bookmarks'
                    },
                    'categories': {
                        component: 'categories'
                    }
                }
            })
        ;
    };

    let bookmarks = {
        templateUrl: 'app/bookmarks/bookmarks.template.html',
        controller: function ($stateParams, BookmarksService) {
            let vm = this;

            vm.deleteBookmark = function (bookmark) {
                BookmarksService.deleteBookmark(bookmark);
            }

            BookmarksService.getBookmarks()
                .then(result => {
                    vm.bookmarks = result;
                });

            vm.currentCategoryName = $stateParams.category;

        }
    };


    angular.module('bookmarks', [
        'ngDialog',
        'service.bookmarks',
        'service.categories',
        'bookmarks.create',
        'bookmarks.edit'
    ])
    .config(configure)
    .component('bookmarks', bookmarks)
    ;

}())
