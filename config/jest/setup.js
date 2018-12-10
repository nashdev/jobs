const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

const globalHeaderNode = document.createElement("div");

globalHeaderNode.setAttribute("id", "global-header");
document.body.appendChild(globalHeaderNode);
