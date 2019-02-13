/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2019 Adobe Incorporated
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
import React from "react";

import fetch from "node-fetch";
import {CustomModelClient} from "./";
import {ModelManager} from "@adobe/cq-spa-page-model-manager";

import sinon from "sinon";


describe("CustomModelClient ->", () => {

    const API_HOST = 'http://localhost:1234';
    const PATH = '/path/to/test';
    const REMOTE_DATA = {test: true};
    const STATUS_TEXT = 'Remote server error';

    const FETCH_CONFIG = {
        headers: {
            Authorization: 'Basic YWRtaW46YWRtaW4='
        }
    };

    let sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe("fetch ->", () => {


        it("should reject with an error message no path provided",() => {
            var customModelClient = new CustomModelClient();
            expect(customModelClient.fetch()).rejects.toThrow('Fetching model rejected for path: undefined');
        });

        it("should reject with an error message when server undefined",() => {
            var customModelClient = new CustomModelClient(API_HOST);
            expect(customModelClient.fetch(PATH)).rejects.toThrow('lhost:1234/path/to/test failed, reason: connect ECONNREFUSED 127.0.0.1:1234');
        });

        it("should manage a remote server error",() => {
            sandbox.stub(fetch, 'Promise').returns(Promise.resolve({status: 500, statusText: STATUS_TEXT, json: ()=>{return {}}}));

            var customModelClient = new CustomModelClient(API_HOST);

            expect(customModelClient.fetch(PATH)).rejects.toThrow('while fetching the model for url: ' + API_HOST + PATH + ', status: ' + STATUS_TEXT);
        });

        it("should succeed and return the data",() => {
            sandbox.stub(fetch, 'Promise').returns(Promise.resolve({status: 201, json: ()=>{return REMOTE_DATA}}));

            var customModelClient = new CustomModelClient(API_HOST);

            expect(customModelClient.fetch(PATH)).resolves.toBe(REMOTE_DATA);
        });

    });

});
