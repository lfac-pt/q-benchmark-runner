q-benchmark-runner
==================

Runs benchmarks against the Q promises library and allows to view the results in a reporter

##Installation and Usage
- Currently only works on UNIX environments
- Run `setup.sh` to setup the nested q repository
- Run `run.sh` to run the benchmarks. This script receives the commits/tags to test via stdin, one per line
- To view the results start a static web server on the root of the project and open results/index.html in a browser