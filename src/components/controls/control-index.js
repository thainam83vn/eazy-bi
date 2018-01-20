import { ControlTextField } from "./control-text-field";
import { ControlColorSelector } from "./control-color-selector";
import { ControlDataFieldSelector } from "./control-data-field-selector";
import { ControlDatasourceSelector } from "./control-datasource-selector";
let components = {}
//For each component in the config fiel into an object
// for (var i = config.length - 1; i >= 0; i--) {
//   let info = config[i];
//   var comp = require(info.path).default;
//   components[info.name] = comp;
// }
components.ControlTextField = ControlTextField;
components.ControlColorSelector = ControlColorSelector;
components.ControlDataFieldSelector = ControlDataFieldSelector;
components.ControlDatasourceSelector = ControlDatasourceSelector;

export default components