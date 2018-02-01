(function() {

    function CategoriesService ($http, $q) {
        const URLS = {
            FETCH: 'json/categories.json'
        }

        let service = {
            getCategories: getCategories
        }, categories;

        function getCategories () {
            return (categories) ? $q.when(categories) : $http.get(URLS.FETCH);
        }

        return service;

    };


    angular.module('category.services', [])
    .service('CategoriesService', CategoriesService)
    ;

}());
