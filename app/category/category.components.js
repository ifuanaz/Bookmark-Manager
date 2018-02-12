(function(){

    let categoryList = {
        bindings: {
            onChangeState: '&'
        },
        templateUrl: 'app/category/components/category-list.html',
        controller: function ($stateParams, $state, ngDialog, CategoriesService, BookmarksService) {
            let vm = this;

            vm.currentCategoryName = $stateParams.category;

            CategoriesService.getCategories().then(response => vm.categories = response);

            vm.backToMainPage = function () {
                vm.onChangeState({$event: {text: `We're watching for You :)`}})
            }

            vm.changeCategory = function (category) {
                vm.onChangeState({$event: {text: `You selected new category ${category.name}.`}})
            }

            vm.deleteCategory = function (category) {
                vm.onChangeState({$event: {text: `You want to delete ${category.name} category?`}})
                ngDialog.openConfirm({
                    template: 'app/category/components/category-delete.html'
                })
                .then(() => {
                    CategoriesService.deleteCategory(category);
                    BookmarksService.deleteBookmarksByCategory(category);
                    vm.onChangeState({$event: {text: `You deleted ${category.name} category.`}})
                    $state.go('app.category');
                })
                .catch(err => {
                    vm.onChangeState({$event: {text: `You changed your mind.`}})
                });
            }
        }
    };


    let categoryCreate = {
        require: {
            parent: '^categoryList' // use parent controller
        },
        controller: function (ngDialog, $state, CategoriesService) {
            let vm = this;

            // Initialization - make use of the parent controllers function
            vm.$onInit = function() {
                vm.parent.onChangeState({$event: {text: 'You are creating a category'}})
            }


            function goBack () {
                ngDialog.close();
                $state.go('app.category');
            }

            ngDialog.open({
                template: 'app/category/components/category-create.html',
                controllerAs: 'ctrlDialog',
                controller: function () {
                    let self = this;

                    self.createCategory = function (category) {
                        if( !CategoriesService.isCurrentCategoryExist(category) ) {
                            CategoriesService.createCategory(category);
                            goBack();
                            vm.parent.onChangeState({$event: {text: 'A category was created!'}})
                        }
                        else {
                            ngDialog.openConfirm({
                                template: '<br><p>This category was created!</p>',
                                plain: true,
                                height: 100
                            })
                            .catch(err => {})
                        }
                    }

                    self.cancel = function () {
                        goBack();
                        vm.parent.onChangeState({$event: {text: 'Ohh you changed you mind :('}})
                    }

                },
                preCloseCallback: function () {
                    $state.go('app.category');
                    // vm.parent.onChangeState({$event: {text: `You changed your mind.`}})
                }
            })
        }
    };


    angular.module('category.components', [
        'ngDialog',
        'category.services',
        'bookmark.services'
    ])
    .component('categoryList', categoryList)
    .component('categoryCreate', categoryCreate)
    ;

}());
