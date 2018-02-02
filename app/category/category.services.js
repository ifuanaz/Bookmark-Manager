(function() {

    function CategoriesService ($http, $q) {
        const URLS = {
            FETCH: 'json/categories.json'
        };

        let service = {
            getCategories: getCategories
        }, categories;

        return service;

        function extract (result) {
            return result.data;
        }

        function cacheCategories (result) {
            categories = extract(result);
            return categories;
        }

        function getCategories () {
            let deferred = $q.defer();

            if(categories) {
                // console.log('get cached category data');
                deferred.resolve(categories);
            }
            else {
                $http.get(URLS.FETCH).then(result => {
                    // console.log('get new category data');
                    deferred.resolve(cacheCategories(result))
                })
            }

            return deferred.promise;
        }
    };


    angular.module('category.services', [])
    .service('CategoriesService', CategoriesService)
    ;

}());
