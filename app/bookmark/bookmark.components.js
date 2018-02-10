(function(){

    let bookmarkList = {
        bindings: {
            onChangeState: '&'
        },
        templateUrl: 'app/bookmark/components/bookmark-list.html',
        controller: function ($stateParams, BookmarksService) {
            let vm = this;

            vm.changeInputText = function (str) {
                if(str === '') {
                    this.onChangeState({$event: {text: `We\'re watching for You :)`}})
                }
                else {
                    this.onChangeState({$event: {text: `You are looking for bookmarks.`}})
                }
            }

            vm.deleteBookmark = function (bookmark) {
                BookmarksService.deleteBookmark(bookmark);
                this.onChangeState({$event: {text: `You deleted ${bookmark.title} bookmark.`}})
            }

            BookmarksService.getBookmarks()
                .then(response => {
                    vm.bookmarks = response;
                });

            vm.currentCategoryName = $stateParams.category;

        }
    };


    let bookmarkCreate = {
        require: {
            parent: '^bookmarkList' // use parent controller
        },
        controller: function ($state, $stateParams, BookmarksService, ngDialog) {
            let vm = this;

            vm.$onInit = function() {
                vm.parent.onChangeState({$event: {text: 'You are creating a bookmark'}})
            }

            function goBack () {
                $state.go('app.bookmark', {category: $stateParams.category});
                ngDialog.close();
            }

            // ngDialog
            ngDialog.open({
                template: 'app/bookmark/components/bookmark-create.html',
                controllerAs: 'ctrlDialog',
                controller: function () {
                    let self = this;

                    self.createBookmark = function (bookmark) {
                        if(bookmark.title && bookmark.url) {
                            bookmark.category = $stateParams.category;
                            BookmarksService.createBookmark(bookmark);
                            goBack();
                            vm.parent.onChangeState({$event: {text: `Bookmark - ${bookmark.title} was created!`}})
                        }
                    }

                    self.cancel = function () {
                        goBack();
                        vm.parent.onChangeState({$event: {text: `Ohh you tapping 'cancel'`}})
                    }

                },
                preCloseCallback: function () {
                    $state.go('app.bookmark', {category: $stateParams.category});
                }
            })
        }
    };


    let bookmarkEdit = {
        require: {
            parent: '^bookmarkList' // use parent controller
        },
        controller: function ($state, $stateParams, BookmarksService, ngDialog) {
            let vm = this;

            let currentBookmark = BookmarksService.getBookmarkById($stateParams.bookmarkId);

            vm.$onInit = function() {
                vm.parent.onChangeState({$event: {text: `You are editing ${currentBookmark.title} bookmark`}})
            }

            function goBack() {
                $state.go('app.bookmark', {category: $stateParams.category});
                ngDialog.close();
            }

            // Use popup ngDialog
            ngDialog.open({
                template: 'app/bookmark/components/bookmark-edit.html',
                controllerAs: 'ctrlDialog',
                controller: function () {
                    let self = this;

                    self.bookmark = angular.copy(currentBookmark);

                    self.editBookmark = function () {
                        let bookmark = self.bookmark;
                        BookmarksService.editBookmark(bookmark);
                        goBack();
                        vm.parent.onChangeState({$event: {text: `You edited ${currentBookmark.title} on ${bookmark.title}`}})
                    }

                    self.cancel = function () {
                        goBack();
                        vm.parent.onChangeState({$event: {text: `Ohh you tapping 'cancel'`}})
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
