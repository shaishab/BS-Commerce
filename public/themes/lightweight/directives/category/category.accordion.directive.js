'use strict';

angular.module('lightweight').directive('categoryAccordion', ['Global', '$rootScope', '$state', 'CategoryService',
    function(Global, $rootScope, $state, CategoryService) {

        var highlightIfSelected = function(category, slug){
            if(category.slug === slug){
                category.isOpen = true;
                return true;
            }
            var subCategorySelected = _.some(category.subCategories, function (sub) {
                return highlightIfSelected(sub, slug);
            });

            if(subCategorySelected){
                category.isOpen = true;
            }else{
                category.isOpen = false;
            }
            return subCategorySelected;
        };

        var processCategorySelection = function(categories, slug){
            _.forEach(categories,function(category){
                highlightIfSelected(category, slug);
            });
        };

        return{
            restrict: 'AE',
            templateUrl: 'themes/lightweight/views/category/category-accordion.html',
            link: function(scope, element, attrs){
                scope.slug = $state.params.slug;
                scope.categories = [];

                CategoryService.getCategories()
                    .$promise
                    .then(function(list){
                        scope.categories = list;

                        if(scope.slug){
                            processCategorySelection(list, scope.slug);
                        }
                    });

                scope.toggleCategory = function(category) {
                    category.isOpen = !category.isOpen;

                    if(category.isOpen) {
                        angular.element('#'+ category.slug).show();
                    } else {
                        angular.element('#'+ category.slug).hide();
                    }
                };

                $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                    //console.log(toState,toParams);
                    scope.slug = (toState.name === 'products-in-category') ? toParams.slug : '';
                    processCategorySelection(scope.categories, scope.slug);
                });
            }
        };
    }
]);
