(function(){

    function configure ($stateProvider) {
        $stateProvider
            .state('app.category.create', {
                url: 'category/create',
                views: {
                    'category-create': {
                        component: 'categoryCreate'
                    }
                }
            })
        ;
    }


    angular.module('category.states', [
        'category.components'
    ])
    .config(configure)
    ;

}())
