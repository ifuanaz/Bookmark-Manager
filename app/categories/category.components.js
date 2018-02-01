(function(){
    let categoryList = {
        templateUrl: 'app/categories/components/category-list.html',
        controller: function (CategoriesService) {
            let vm = this;

            CategoriesService.getCategories().then(result => vm.categories = result.data);

        }
    };


    angular.module('category.components', [
        'category.services'
    ])
    .component('categoryList', categoryList)
    ;

}())
