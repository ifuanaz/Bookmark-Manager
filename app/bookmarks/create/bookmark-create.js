(function(){
    function configure ($stateProvider) {
        $stateProvider
            .state('app.categories.create', {
                url: '/create/',
                views: {
                    'bookmark-create': {
                        component: 'create'
                    }
                }
            })
        ;
    };

    let create = {
        // templateUrl: 'app/bookmarks/create/bookmark-create.template.html',
        controller: function ($state, $stateParams, BookmarksService, ngDialog) {
            let vm = this;

            function goBack () {
                $state.go('app.categories', {category: $stateParams.category});
                ngDialog.close();
            }

            vm.createBookmark = function (bookmark) {
                if(bookmark.title && bookmark.url) {
                    bookmark.category = $stateParams.category;
                    BookmarksService.createBookmark(bookmark);
                    goBack();
                }
            }

            vm.cancel = function () {
                goBack();
            }

            // ngDialog
            ngDialog.open({
                template: 'app/bookmarks/create/bookmark-create.template.html',
                data: {
                    createBookmark: vm.createBookmark,
                    cancel: vm.cancel
                },
                preCloseCallback: function () {
                    $state.go('app.categories', {category: $stateParams.category});
                }
            })
        }
    };


    angular.module('bookmarks.create', [])
    .config(configure)
    .component('create', create);
    ;

}())
