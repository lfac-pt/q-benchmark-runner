#!/bin/sh

#Prepare the necessary folders
git checkout master
(rm -rf benchmarkRunner/results)
(mkdir benchmarkRunner/results)
(rm -rf benchmarkRunnerTemp)
(mkdir benchmarkRunnerTemp)
(cp -r benchmark/ benchmarkRunnerTemp)

#Write the index.csv header
echo "version" > benchmarkRunner/results/index.csv

while read VERSION; do
	echo $VERSION >> benchmarkRunner/results/index.csv

   	echo  "Benchmarking $VERSION"

	#Run the benchmarks
	git checkout $VERSION
	(echo "ts,suite,test,ops" && ./node_modules/matcha/bin/matcha benchmarkRunnerTemp/compare-with-callbacks.js benchmarkRunnerTemp/scenarios.js -R csv) > benchmarkRunner/results/$VERSION.csv
done

#Go back to master and clean up benchmarkRunnerTemp
git checkout master
(rm -rf benchmarkRunnerTemp)

echo "Done!"