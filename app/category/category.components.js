(function(){

    let categoryList = {
        templateUrl: 'app/category/components/category-list.html',
        controller: function ($stateParams, $state, CategoriesService, BookmarksService) {
            let vm = this;

            vm.currentCategoryName = $stateParams.category;

            CategoriesService.getCategories().then(result => vm.categories = result);

            vm.deleteCategory = function (category) {
                CategoriesService.deleteCategory(category);
                BookmarksService.deleteBookmarksByCategory(category);
                $state.go('app.category');
            }

        }
    };


    let categoryCreate = {
        // templateUrl: 'app/category/components/category-create.html',
        controller: function (ngDialog, $state, CategoriesService) {
            let vm = this;

            function goBack () {
                ngDialog.close();
                $state.go('app.category');
            }

            vm.createCategory = function (category) {
                CategoriesService.createCategory(category);
                goBack();
            }

            vm.cancel = function () {
                goBack();
            }

            ngDialog.open({
                template: 'app/category/components/category-create.html',
                data: {
                    createCategory: vm.createCategory,
                    cancel: vm.cancel
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
