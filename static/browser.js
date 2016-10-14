angular
    .module('tutorials',['nvd3'])
    .controller("nodejs-keen",['$scope',function($scope){
        var client = new Keen({
            projectId: "5706............fe6a1279",
            readKey: "29ec96c5e..........746871b0923"
        });

        // Configure NVD3 charting engine
        $scope.options = {
            chart: {
                type: 'lineChart',
                height: 300,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function (d) {
                    return d.x;
                },
                y: function (d) {
                    return d.y;
                },
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Time',
                    tickFormat: function (d) {
                        return d3.time.format("%X")(new Date(d));
                    }
                }
            }
        };

        $scope.temperature = [
            {
                values: [],
                key: 'Temperature',
                color: 'red'
            }
        ];

        $scope.humidity = [
            {
                values: [],
                key: 'Humidity',
                color: 'blue'
            }
        ];

        // Define Keen.IO query
        var query = new Keen.Query("multi_analysis", {
            event_collection: "humtemp",
            timeframe: {
                start : "2016-04-09T00:00:00.000Z",
                end : "2016-04-11T00:00:00.000Z"
            },
            interval: "hourly",
            analyses: {
                temp : {
                    analysis_type : "average",
                    target_property: "temp"
                },
                hum : {
                    analysis_type : "average",
                    target_property: "hum"
                }
            }
        });

        Keen.ready(function(){
            // Execute the query..
            client.run(query, function(err, res){

                // ..transform received data to be accepted by NVD3..
                res.result.forEach(function(record){
                    var timestamp = new Date(record.timeframe.end);
                    $scope.temperature[0].values.push({
                        x: timestamp,
                        y: record.value.temp.toFixed(2)
                    });
                    $scope.humidity[0].values.push({
                        x: timestamp,
                        y: record.value.hum.toFixed(2)
                    });
                });

                // ..and do render
                $scope.$apply();
            });
        });
    }]);
