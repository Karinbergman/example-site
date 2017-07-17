var app = angular.module('MyApp', []);

app.controller('BlogPostCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('blogposts.json')
        .then(function(response){
            $scope.blogposts = response.data;
        }).catch(function (data) {
        console.log('Error');
    });
}]);

$( document ).ready(function() {
    $('.grid').imagesLoaded( function() {
        $('.grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            isAnimated: true,
            percentPosition: true,
            animationOptions: {
                duration: 150
            }
        })
    });
});
