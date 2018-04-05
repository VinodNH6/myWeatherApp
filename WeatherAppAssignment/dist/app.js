        var NameComponent = {
            bindings: {
                weathers: '='
            },
            template: `
            <div>
            <p> HI this is vinod</p>
            <p> {{weathers}} </p>
            <section ng-show="weathers !== undefined">
                <p> {{weathers.name}} </p>
                <p ng-repeat="w in weathers.weather">
                        {{w.description}}
                        {{w.id}} 
                        {{w.main}}
                        {{w.getIcon}}
                </p>
            </section>
            </div>
            `
        };

         angular.module("myapp", [])

         .controller("HelloController", function($scope, $http, $rootScope, $timeout, $interval) {

            $scope.wlist = [];

            $scope.environment = {
                appId: '45f4dd45e0f724512ba044c5a2caf4bc',
                baseUrl: 'http://api.openweathermap.org/data/2.5/', 
                units: 'imperial'
            };


            $scope.onSubmit = function(cityName) {
                console.log($scope.wlist);
                 var temp = [];
                $http.get($scope.environment.baseUrl +
                'weather?q='+ cityName + 
                '&appid='+ $scope.environment.appId +
                '&units=' + $scope.environment.units).
                    then(function(response) {
                        console.log("res");
                        temp.push(response.data);
                        var obj = {
                            city: cityName,
                            res : temp 
                        };
                        
                        $scope.wlist.push(obj);

                        console.log("timeout started: Every Hour");
                        $scope.wlist.forEach(function(city) {
                            $interval(function () {
                                $scope.onSubmit2(city.city);
                            }, 1000*60*60);
                        });
                    });
            }

            $scope.onSubmit2 = function(cityName) {
                console.log($scope.wlist);
                var temp = [];
                var edit = false;

                $http.get($scope.environment.baseUrl +
                'weather?q='+ cityName + 
                '&appid='+ $scope.environment.appId +
                '&units=' + $scope.environment.units).
                    then(function(response) {
                        console.log("res");

                        temp.push(response.data);
                        var obj = {
                            city: cityName,
                            res : temp
                        };
                        $scope.wlist.forEach(function(element) {
                            console.log("iterate");
                            if(element.city === cityName) {
                                console.log("matched... so edit");
                                element.res.push(response.data);
                                edit = true;
                            }
                            else{
                                console.log("not matched... so add ");
                            }
                        });

                        if(!edit) {
                            $scope.wlist.push(obj);
                        }

                    });
            }

         })

        .component('weather', NameComponent);
