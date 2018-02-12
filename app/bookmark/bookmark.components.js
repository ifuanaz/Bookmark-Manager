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


    let bookmarskMultiCreate = {
        require: {
            parent: '^bookmarkList' // use parent controller
        },
        controller: function ($state, CategoriesService, BookmarksService, ngDialog) {
            let vm = this;

            vm.$onInit = function() {
                vm.parent.onChangeState({$event: {text: 'You are creating multiple bookmarks'}})
            }

            function goBack () {
                $state.go('app.category');
                ngDialog.close();
            }

            ngDialog.open({
                template: 'app/bookmark/components/bookmark-multi_create.html',
                controllerAs: 'ctrlDialog',
                controller: function () {
                    let self = this;

                    CategoriesService.getCategories().then(response => self.options = response);

                    self.createBookmarks = function ({newBookmark, categories}) {
                        let bookmarks = [];

                        if(categories) {
                            for (let category of categories.data) {
                                bookmarks.push({
                                    title: newBookmark.title,
                                    url: newBookmark.url,
                                    category: category
                                });
                            }

                            BookmarksService.createMultipleBookmarks(bookmarks);
                            vm.parent.onChangeState({$event: {text: `You created ${categories.data.length} bookmark(s) - ${newBookmark.title}`}})
                            goBack();
                        }
                        else {
                            ngDialog.openConfirm({
                                template: `
                                    <div>
                                        <h4>Choose a category.</h4>
                                        <button type="button" class="btn btn-default btn-lg pull-right" ng-click="closeThisDialog()">Close</button>
                                    </div>
                                `,
                                height: 120,
                                plain: true
                            })
                            .catch(err => {})
                        }
                    }

                    self.cancel = function () {
                        goBack();
                        vm.parent.onChangeState({$event: {text: `We're watching for You :)`}})
                    }
                },
                preCloseCallback: function () {
                    $state.go('app.category');
                    // vm.parent.onChangeState({$event: {text: `You changed your mind.`}})
                }
            })
        }
    }


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
                    // vm.parent.onChangeState({$event: {text: `You changed your mind.`}})
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
                    // vm.parent.onChangeState({$event: {text: `You changed your mind.`}})
                }
            })
        }
    };


    angular.module('bookmark.components', [
        'ngDialog',
        'bookmark.services'
    ])
    .component('bookmarkList', bookmarkList)
    .component('bookmarskMultiCreate', bookmarskMultiCreate)
    .component('bookmarkCreate', bookmarkCreate)
    .component('bookmarkEdit', bookmarkEdit)
    ;

}());
