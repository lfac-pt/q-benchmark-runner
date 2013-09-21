(function () {
    "use strict";

    function groupByTest(data) {
        var dataByTest;

        dataByTest = {};

        data.forEach(function (dataRow) {
            dataRow.forEach(function (testData) {
                var testDesc;

                testDesc = testData.suite + " > " + testData.test;

                if (!dataByTest[testDesc]) {
                    dataByTest[testDesc] = [];
                }

                dataByTest[testDesc].push(+testData.ops);
            });
        });

        return dataByTest;
    }

    function loadData(versions) {
        return Q.all(versions.map(function (id) {
            var deferred;

            deferred = Q.defer();

            d3.csv("../results/" + id + ".csv")
                .get(function (errors, data) {
                    if (errors instanceof Array && errors.length > 0) {
                        deferred.reject(errors);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        })).then(groupByTest);
    }

    function loadIndex() {
        var deferred;

        deferred = Q.defer();

        d3.csv("../results/index.csv")
            .get(function (errors, data) {
                if (errors instanceof Array && errors.length > 0) {
                    deferred.reject(errors);
                } else {
                    deferred.resolve(data);
                }
            });

        return deferred.promise
            .then(function (data) {
                return data.map(function (versionWrapper) {
                    return versionWrapper.version;
                });
            });
    }

    loadIndex()
        .done(function (versions) {
            loadData(versions).done(function (dataByTest) {
                var tests, html;

                tests = Object.keys(dataByTest);

                html = tests.map(function (testName, index) {
                    return "<h2>" + testName + '</h2> <div class="container-for-' + index +'"></div>';
                }).join("");

                document.body.innerHTML += html;

                tests.forEach(function (testName, index) {
                    drawChart(dataByTest[testName], versions, ".container-for-" + index);
                });
            });
        });

}());