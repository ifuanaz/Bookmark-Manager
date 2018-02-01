(function(){

    let bookmarkList = {
        templateUrl: 'app/bookmarks/components/bookmark-list.html',
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


    let bookmarkCreate = {
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
                template: 'app/bookmarks/components/bookmark-create.html',
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


    let bookmarkEdit = {
        // templateUrl: 'app/bookmarks/edit/bookmark-edit.template.html',
        controller: function ($state, $stateParams, BookmarksService, ngDialog) {
            let vm = this;

            let currentBookmark = BookmarksService.getBookmarkById($stateParams.bookmarkId);
            vm.bookmark = angular.copy(currentBookmark);

            function goBack() {
                $state.go('app.categories', {category: $stateParams.category});
                ngDialog.close();
            }

            vm.editBookmark = function () {
                let bookmark = vm.bookmark;
                BookmarksService.editBookmark(bookmark);
                goBack();
            }

            vm.cancel = function () {
                goBack();
            }

            // Use popup ngDialog
            ngDialog.open({
                template: 'app/bookmarks/components/bookmark-edit.html',
                data: {
                    bookmark: vm.bookmark,
                    editBookmark: vm.editBookmark,
                    cancel: vm.cancel
                },
                preCloseCallback: function () {
                    $state.go('app.categories', {category: $stateParams.category});
                }
            })
        }
    };


    angular.module('bookmark.components', [
        'ngDialog',
        'bookmark.services'
    ])
    .component('bookmarkList', bookmarkList)
    .component('bookmarkCreate', bookmarkCreate)
    .component('bookmarkEdit', bookmarkEdit)
    ;

}());
