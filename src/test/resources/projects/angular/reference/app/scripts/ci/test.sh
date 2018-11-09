/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2018 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
 # IP is required as docker container is separated completely and therefor host or IP of host-system has to be provided (instead of localhost)
export IP=${IP:=`hostname`}

# Get selenium-standalone via Docker
docker pull vvoyer/selenium-standalone:latest
docker run --name sel-standalone -d --rm -p 4444:4444 vvoyer/selenium-standalone:latest

# Cool down to let Selenium grid be fully ready
sleep 20

# Execute tests
npm run ci

TEST_RESULT_CODE=$?

# Stop Selenium grid
docker stop sel-standalone

exit $TEST_RESULT_CODE
