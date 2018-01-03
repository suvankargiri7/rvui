/* Copyright © 2016 BroadSoft. All rights reserved. */
'use strict';

angular
.module('app')
app.factory('reqInterceptor',['$rootScope',function($rootScope)
{
        var sessionInjector = {
            request: function (config) {
                config.headers['Origin'] = 'https://cppjs.com';
  
                return config;
            }
        };
        return sessionInjector;
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('reqInterceptor');
}]);
