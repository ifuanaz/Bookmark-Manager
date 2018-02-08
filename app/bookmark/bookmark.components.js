(function(){

    let bookmarkList = {
        templateUrl: 'app/bookmark/components/bookmark-list.html',
        controller: function ($stateParams, BookmarksService) {
            let vm = this;

            vm.deleteBookmark = function (bookmark) {
                BookmarksService.deleteBookmark(bookmark);
            }

            BookmarksService.getBookmarks()
                .then(response => {
                    vm.bookmarks = response;
                });

            vm.currentCategoryName = $stateParams.category;

        }
    };


    let bookmarkCreate = {
        controller: function ($state, $stateParams, BookmarksService, ngDialog) {
            function goBack () {
                $state.go('app.bookmark', {category: $stateParams.category});
                ngDialog.close();
            }

            // ngDialog
            ngDialog.open({
                template: 'app/bookmark/components/bookmark-create.html',
                controllerAs: 'ctrlDialog',
                controller: function () {
                    let vm = this;

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

                },
                preCloseCallback: function () {
                    $state.go('app.bookmark', {category: $stateParams.category});
                }
            })
        }
    };


    let bookmarkEdit = {
        controller: function ($state, $stateParams, BookmarksService, ngDialog) {
            function goBack() {
                $state.go('app.bookmark', {category: $stateParams.category});
                ngDialog.close();
            }

            // Use popup ngDialog
            ngDialog.open({
                template: 'app/bookmark/components/bookmark-edit.html',
                controllerAs: 'ctrlDialog',
                controller: function () {
                    let vm = this;

                    let currentBookmark = BookmarksService.getBookmarkById($stateParams.bookmarkId);
                    vm.bookmark = angular.copy(currentBookmark);

                    vm.editBookmark = function () {
                        let bookmark = vm.bookmark;
                        BookmarksService.editBookmark(bookmark);
                        goBack();
                    }

                    vm.cancel = function () {
                        goBack();
                    }

                },
                preCloseCallback: function () {
                    $state.go('app.bookmark', {category: $stateParams.category});
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
