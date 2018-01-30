(function(){
    function configure ($stateProvider) {
        $stateProvider
            .state('app.categories.create', {
                url: '/create/',
                views: {
                    'bookmark-create': {
                        templateUrl: 'app/bookmarks/create/bookmark-create.template.html',
                        controller: 'BookmarkCtrl as $ctrl'
                        // component: 'bookmark-create'
                    }
                }
            })
        ;
    };

    function BookmarkCtrl ($state, $stateParams, BookmarksService) {
        let vm = this;

        function goBack () {
            $state.go('app.categories', {
                category: $stateParams.category
            });
        }

        vm.createBookmark = function (bookmark) {
            console.log(bookmark);
            if(bookmark.title && bookmark.url) {
                bookmark.category = $stateParams.category;
                BookmarksService.createBookmark(bookmark);
                goBack();
            }
        }

        vm.cancel = function () {
            goBack();
        }
    };


    angular.module('bookmarks.create', [])
    .config(configure)
    .controller('BookmarkCtrl', BookmarkCtrl)
    ;

}())
