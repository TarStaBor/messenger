import { JSDOM } from 'jsdom';

// jsdom
const jsdom = new JSDOM(`<body><div id="app"></div></body>`, { url: 'http://localhost' });

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.FormData = jsdom.window.FormData;
global.location = jsdom.window.location;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.MouseEvent = jsdom.window.MouseEvent;
