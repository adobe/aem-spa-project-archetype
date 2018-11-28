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

/**
 * Generic observe function
 *
 * @param {function} verify     - function which verify the processed object
 * @param {function} done       - Mocha asynchronous function
 * @returns {Function}
 */
function observe(verify, done) {
    return function (mutationsList) {
        for (let mutation of mutationsList) {
            if (verify(mutation)) {
                done();
                break;
            }
        }
    }
}

/**
 * Provides a MutationObserver instance that allows providing a callback function to verify that a condition is meet before call the provide "done" callback function
 *
 * @param verify    - Callback function to verify a provided condition is meet
 * @param done      - Callback function to be called when the verify function returns a positive value
 * @returns {MutationObserver}
 */
export function getVerifyObserver(verify, done) {
    return new MutationObserver(observe(verify, done));
}