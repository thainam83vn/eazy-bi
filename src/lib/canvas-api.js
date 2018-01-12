export class CanvasApi {
  static rect(p) {
    p.ctx.fillRect(p.x, p.y, p.width, p.height);
  }

  static line(p) {
    p.ctx.beginPath();
    p.ctx.moveTo(p.x, p.y);
    p.ctx.lineTo(p.width, p.height);
    p.ctx.stroke();
  }
  static multiLine(p) {
    let ctx = p.ctx;
    ctx.beginPath();
    for(let line of p.lines){
      ctx.moveTo(line.x, line.y);
      ctx.lineTo(line.width, line.height);
    }
    ctx.stroke();
  }
}
