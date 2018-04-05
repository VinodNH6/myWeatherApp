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

         .controller("HelloController", function($scope, $http, $rootScope, $timeout) {
            $scope.cities = [];
            $scope.wlist = [];
            $scope.timeo = [];
            $scope.no = false;

            $scope.environment = {
                appId: '45f4dd45e0f724512ba044c5a2caf4bc',
                baseUrl: 'http://api.openweathermap.org/data/2.5/', 
                units: 'imperial'
            };


            $scope.onSubmit = function(cityName) {
                console.log($scope.wlist);
               // var temp = [];
                $http.get($scope.environment.baseUrl +
                'weather?q='+ cityName + 
                '&appid='+ $scope.environment.appId +
                '&units=' + $scope.environment.units).
                    then(function(response) {
                        console.log("res");
                        //$scope.timeo.push(response.data);
                        var obj = {
                            city: cityName,
                            res : response.data//$scope.timeo
                        };
                        // $scope.wlist.forEach(function(element) {
                        //     console.log("iterate");
                        //     if(element.city === cityName) {
                        //         console.log("matched... so edit");
                        //         //$scope.wlist.push(obj);
                        //         element.res.push(response.data);
                        //     }
                        //     else{
                        //         console.log("not matched... so add ");
                        //        $scope.wlist.push(obj);
                        //        //$scope.no = true;
                        //     }
                        // });

                        // if($scope.wlist.length === 0) {
                        //     $scope.wlist.push(obj);
                        // }
                        
                        $scope.wlist.push(obj);
                        $scope.cities.push(cityName);
                    });
            }


            // $timeout(function () {
            //     $scope.onSubmit("belgaum");
            //     $scope.timeo.push(response.data)
            //     var obj = {
            //         city: cityName,
            //         res : $scope.timeo
            //     };
            //     //$scope.wlist.push(obj);
            // }, 9000);

         })

        .component('weather', NameComponent);