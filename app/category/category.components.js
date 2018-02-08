(function(){

    let categoryList = {
        templateUrl: 'app/category/components/category-list.html',
        controller: function ($stateParams, $state, ngDialog, CategoriesService, BookmarksService) {
            let vm = this;

            vm.currentCategoryName = $stateParams.category;

            CategoriesService.getCategories().then(response => vm.categories = response);

            vm.deleteCategory = function (category) {
                ngDialog.openConfirm({
                    template: 'app/category/components/category-delete.html'
                })
                .then(() => {
                    CategoriesService.deleteCategory(category);
                    BookmarksService.deleteBookmarksByCategory(category);
                    $state.go('app.category');
                })
                .catch(err => {});
            }
        }
    };


    let categoryCreate = {
        controller: function (ngDialog, $state, CategoriesService) {
            function goBack () {
                ngDialog.close();
                $state.go('app.category');
            }

            ngDialog.open({
                template: 'app/category/components/category-create.html',
                controllerAs: 'ctrlDialog',
                controller: function () {
                    let vm = this;

                    vm.createCategory = function (category) {
                        if( !CategoriesService.isCurrentCategoryExist(category) ) {
                            CategoriesService.createCategory(category);
                            goBack();
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

                    vm.cancel = function () {
                        goBack();
                    }

                },
                preCloseCallback: function () {
                    $state.go('app.category');
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
