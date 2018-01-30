(function(){
    let categories = {
        templateUrl: 'app/categories/categories.template.html',
        controller: function (CategoriesService) {
            let vm = this;

            CategoriesService.getCategories().then(result => vm.categories = result.data);

        }
    };


    angular.module('categories', [
        'service.categories'
    ])
    .component('categories', categories)
    ;

}())
