#!/bin/sh

cd q

#Prepare the necessary folders
git checkout master
(rm -rf ../results)
(mkdir ../results)
(rm -rf benchmarkRunnerTemp)
(mkdir benchmarkRunnerTemp)
(cp -r benchmark/ benchmarkRunnerTemp)

#Write the index.csv header
echo "version" > ../results/index.csv

while read VERSION; do
	echo $VERSION >> ../results/index.csv

   	echo  "Benchmarking $VERSION"

	#Run the benchmarks
	git checkout $VERSION
	(echo "ts,suite,test,ops" && ./node_modules/matcha/bin/matcha benchmarkRunnerTemp/*.js -R csv) > ../results/$VERSION.csv
done

#Go back to master and clean up benchmarkRunnerTemp
git checkout master
(rm -rf benchmarkRunnerTemp)

echo "Done!"