(function(){
    function configure ($stateProvider) {
        $stateProvider
            .state('app.home.edit', {
                url: 'edit/:bookmarkId',

                views: {
                    'bookmark-edit': {
                        component: 'edit'
                    }
                }
            })
        ;
    };

    let edit = {
        templateUrl: 'app/bookmarks/edit/bookmark-edit.template.html',
        controller: function ($state, $stateParams, BookmarksService) {
            let vm = this;

            vm.bookmark = BookmarksService.getBookmarkById($stateParams.bookmarkId);

            function goBack() {
                $state.go('app.home');
            }

            vm.editBookmark = function () {
                let bookmark = angular.copy(vm.bookmark);
                BookmarksService.editBookmark(bookmark);
                goBack();
            }

            vm.cancel = function () {
                goBack();
            }
        }
    };


    angular.module('bookmarks.edit', [])
    .config(configure)
    .component('edit', edit)
    ;

}())
