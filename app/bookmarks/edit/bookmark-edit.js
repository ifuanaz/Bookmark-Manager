(function(){
    function configure ($stateProvider) {
        $stateProvider
            .state('app.categories.edit', {
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
        // templateUrl: 'app/bookmarks/edit/bookmark-edit.template.html',
        controller: function ($state, $stateParams, BookmarksService, ngDialog) {
            let vm = this;

            console.log($stateParams);
            vm.bookmark = BookmarksService.getBookmarkById($stateParams.bookmarkId);

            function goBack() {
                $state.go('app.categories', {category: $stateParams.category});
                ngDialog.close();
            }

            vm.editBookmark = function () {
                let bookmark = angular.copy(vm.bookmark);
                BookmarksService.editBookmark(bookmark);
                goBack();
            }

            vm.cancel = function () {
                goBack();
            }

            // Use popup ngDialog
            ngDialog.open({
                template: 'app/bookmarks/edit/bookmark-edit.template.html',
                data: {
                    bookmark: vm.bookmark,
                    editBookmark: vm.editBookmark,
                    cancel: vm.cancel
                }
            })
        }
    };


    angular.module('bookmarks.edit', [
        'ngDialog'
    ])
    .config(configure)
    .component('edit', edit)
    ;

}())
