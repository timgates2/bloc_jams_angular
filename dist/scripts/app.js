 (function() {
              /*$stateProvider.state(stateName, stateConfig)*/
     function config($stateProvider, $locationProvider) {
        $locationProvider
        .html5Mode({
            enabled: true,
            requireBase: false
        });
         $stateProvider
            .state('landing' /* state name part*/, {
                url: '/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html' /*state config part*/
            })
            .state('album', {
            url: '/album',
            controller: 'AlbumCtrl as album', /*access album controller with "album." */
            templateUrl: '/templates/album.html'
         })
         .state('collection', {
             url: '/collection',
             controller: 'CollectionCtrl as collection',
             templateUrl: '/templates/collection.html'
         });
     }
 
     angular
        .module('blocJams', ['ui.router'])
        .config(config);
 })();