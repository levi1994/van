import initCircle from './base/Circle.js';
import initImage from './base/Image.js';
import initText from './base/Text.js';
import initLine from './base/Line.js';
import initRect from './base/Rect.js';

// registe gloval api
export default function(Van) {
  initCircle(Van);
  initImage(Van);
  initText(Van);
  initLine(Van);
  initRect(Van);
}
