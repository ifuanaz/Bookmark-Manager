(function() {

    function CategoriesService ($http, $q) {
        const URLS = {
            FETCH: 'json/categories.json'
        };

        let service = {
            getCategories: getCategories,
            createCategory: createCategory,
            deleteCategory: deleteCategory,
            isCurrentCategoryExist: isCurrentCategoryExist
        }, categories;

        return service;

        // get object with key data - array with categories
        function cacheCategories ({data}) {
            categories = data;
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

        function isCurrentCategoryExist (category) {
            return _.find(categories, {name: category.name});
        }

    };


    angular.module('category.services', [])
    .service('CategoriesService', CategoriesService)
    ;

}());
