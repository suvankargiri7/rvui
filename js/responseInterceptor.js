/* Copyright © 2016 BroadSoft. All rights reserved. */

'use strict';

angular
.module('app')
app.factory('resInerceptor', ['$rootScope',function($rootScope)
    {

        var resInterceptor = {
            response: function (response) {
                console.log(response);
            },
            responseError: function (rejection) {
                console.log(rejection);
            }
        };
        return resInterceptor;

    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('resInerceptor');
    }]);
