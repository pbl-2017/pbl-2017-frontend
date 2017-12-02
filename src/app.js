import {P5App} from "./p5_app.js"
import APIWrapper from "./APIWrapper/APIWrapper.js"
import {APIWrapperImpl} from "./APIWrapper/APIWrapper.js"

var apiWrapper = new APIWrapperImpl();
window.apiWrapper = apiWrapper;
var app = new P5App(apiWrapper);

///