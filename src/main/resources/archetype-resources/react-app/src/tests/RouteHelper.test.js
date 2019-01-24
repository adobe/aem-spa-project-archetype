/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2018 Adobe Incorporated
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
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { withRoute, CompositeComponent } from "../RouteHelper";

import { mount, shallow, configure } from "enzyme";
import ShallowRenderer from "react-test-renderer/shallow";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import { ModelManager } from "@adobe/cq-spa-page-model-manager";
import sinon from "sinon";

describe("RouterHelper ->", () => {
    const ROUTE_CONTENT_CLASS_NAME = "route-content";
    const ROOT_NODE_CLASS_NAME = "route-node";
    const PAGE_TITLE = "Page Title Test";
    const CUSTOM_ROUTE_PATH = "/content/custom";
    const CUSTOM_ROUTE_PATH_2 = "/content/custom/2";
    const CUSTOM_ROUTE_PATH_ALIAS_2 = "/custom2";

    let rootNode;

    class RouteContent extends Component {
        render() {
            return <div data-title={this.props.cqModel && this.props.cqModel.title} className={ROUTE_CONTENT_CLASS_NAME}/>;
        }
    }

    let sandbox = sinon.createSandbox();

    beforeEach(() => {
        sandbox.stub(ModelManager, 'getData')
            .withArgs({pagePath: CUSTOM_ROUTE_PATH}).resolves({})
            .withArgs({pagePath: CUSTOM_ROUTE_PATH_2}).resolves({})
            .withArgs({pagePath: CUSTOM_ROUTE_PATH_ALIAS_2}).resolves({});

        rootNode = document.createElement('div');
        rootNode.className = ROOT_NODE_CLASS_NAME;
        document.body.appendChild(rootNode);
    });

    afterEach(() => {
        window.location.hash = '';

        if (rootNode) {
            document.body.removeChild(rootNode);
        }

        sandbox.restore();
    });

describe("withRoute ->", () => {
    /**
     * Entry test
     */
    it("should render the wrapped component without error", () => {
        const cqModel = {
            path: "/content/page/path",
            title: PAGE_TITLE
        };

        let WrappedComponent = withRoute(RouteContent);
        ReactDOM.render(
        <BrowserRouter>
        <WrappedComponent cqModel={cqModel} />
                </BrowserRouter>,
                rootNode
        );
    });

    /**
     * Check the correspondance between path and related component.
     */
    it("should render the correct component", () => {
        const wrapper = shallow(<withRoute />);
        const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
                    const routeProps = route.props();
        pathMap[routeProps.path] = routeProps.component;
        return pathMap;
    }, {});

        expect(pathMap["/content/page/path"]).toBe(CompositeComponent);
    });

    /**
     * Check the props are set correctly in route
     */
    it("should set the correct props in route", () => {
        const cqModel = {
            path: "/content/page/path",
            title: PAGE_TITLE
        };

        const renderer = new ShallowRenderer();
        let WrappedComponent = withRoute(RouteContent);
        renderer.render(
        <BrowserRouter>
        <WrappedComponent cqModel={cqModel} />
                </BrowserRouter>
        );
        const result = renderer.getRenderOutput();

        expect(result).toMatchInlineSnapshot(`
<Router
  history={
    Object {
      "action": "POP",
      "block": [Function],
      "createHref": [Function],
      "go": [Function],
      "goBack": [Function],
      "goForward": [Function],
      "length": 1,
      "listen": [Function],
      "location": Object {
        "hash": "",
        "pathname": "/",
        "search": "",
        "state": undefined,
      },
      "push": [Function],
      "replace": [Function],
    }
  }
>
  <CompositeRoute
    cqModel={
      Object {
        "path": "/content/page/path",
        "title": "Page Title Test",
      }
    }
  />
</Router>
`);
        });
    });
});
