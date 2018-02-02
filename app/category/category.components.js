(function(){

    let categoryList = {
        templateUrl: 'app/category/components/category-list.html',
        controller: function (CategoriesService) {
            let vm = this;

            CategoriesService.getCategories().then(result => vm.categories = result);

        }
    };


    angular.module('category.components', [
        'category.services'
    ])
    .component('categoryList', categoryList)
    ;

}());
