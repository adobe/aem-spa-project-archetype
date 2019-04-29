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
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './ImportComponents';
import {CustomModelClient} from './components/CustomModelClient'

function render(pageModel, useHydrate) {
    const history = createBrowserHistory();
    ReactDOM[useHydrate ? 'hydrate' : 'render']((
        <Router history={history}>
            <App history={history}
                 cqChildren={pageModel[Constants.CHILDREN_PROP]}
                 cqItems={pageModel[Constants.ITEMS_PROP]}
                 cqItemsOrder={pageModel[Constants.ITEMS_ORDER_PROP]}
                 cqPath={pageModel[Constants.PATH_PROP]}
                 locationPathname={ window.location.pathname }/>
        </Router>),
      document.getElementById('page'));
}

document.addEventListener('DOMContentLoaded', () => {
    let jsonScript = document.getElementById('__INITIAL_STATE__');
    let initialState = null;
    if (jsonScript) {
        initialState = JSON.parse(jsonScript.innerText);
        // Remove the script element from the DOM
        jsonScript.remove();
    }

    let initialModel = initialState ? initialState.rootModel : undefined;

    let modelClient;
    // Set a custom ModelClient with authorization header in test environment
    if (process.env.NODE_ENV === 'development') {
        const apiHost = process.env.REACT_APP_API_HOST;
        modelClient = new CustomModelClient(apiHost);
    }

    ModelManager.initialize({model: initialModel, modelClient: modelClient}).then((model) => {
        render(model, !!initialModel);
    });
});


