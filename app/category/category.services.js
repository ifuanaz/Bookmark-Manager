(function() {

    function CategoriesService ($http, $q) {
        const URLS = {
            FETCH: 'json/categories.json'
        };

        let service = {
            getCategories: getCategories,
            createCategory: createCategory,
            deleteCategory: deleteCategory
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

        function createCategory (category) {
            category.id = parseInt(_.uniqueId(10));
            categories.push(category);
        }

        function deleteCategory (category) {
            _.remove(categories, {id: category.id});
        }

    };


    angular.module('category.services', [])
    .service('CategoriesService', CategoriesService)
    ;

}());
