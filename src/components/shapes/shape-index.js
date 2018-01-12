import { Shape } from "./shape";
import { Circle } from "./customs/circle";
import { TextBox } from "./customs/textbox";
import { Icon } from "./customs/icon";
import { Line } from "./customs/line";
import { Triangle } from "./customs/triangle";
import { Star } from "./customs/star";
import { Rectangle } from "./customs/rectangle";

let components = {}
//For each component in the config fiel into an object
// for (var i = config.length - 1; i >= 0; i--) {
//   let info = config[i];
//   var comp = require(info.path).default;
//   components[info.name] = comp;
// }
components.Shape = Shape;
components.Circle = Circle;
components.TextBox = TextBox;
components.Icon = Icon;
components.Line = Line;
components.Triangle = Triangle;
components.Star = Star;
components.Rectangle = Rectangle;

export default components