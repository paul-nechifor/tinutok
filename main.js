function main() {
  var width = 1920;
  var height = 1080;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  ctx.fillStyle = '#d7aa5f';
  ctx.fillRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#b84d3f';


  var characterSet = buildCharacterSet();

  var nThreads = 13;
  var separation = 132;

  for (var i = 0; i < nThreads; i++) {
    drawThread(characterSet, ctx, 140 + i * separation, 50);
  }
}

function drawThread(characterSet, ctx, sx, sy) {
  var string = randomText(6, 4);
  var text = new Text(characterSet, 500, string);

  var spline = text.getSpline();
  //spline.draw(ctx, sx, sy, 10);

  var walker = new BezierSplineWalker(spline, 0.5, sx, sy, 10);

  var sWalker = new BezierSplineSpeedWalker(walker);
  var morePoints = true;

  function doNextPoint() {
    morePoints = drawPoints(ctx, sWalker, 9);
    if (morePoints) {
      setTimeout(doNextPoint, 0);
    }
  }

  doNextPoint();
}

function drawPoints(ctx, sWalker, times) {
  for (var i = 0; i < times; i++) {
    var x = sWalker.x;
    var y = sWalker.y;
    var len = 4;

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x-len, y);
    ctx.lineTo(x+len, y+len);
    ctx.stroke();

    var morePoints = sWalker.advanceBy(0.5);
    if (!morePoints) {
      return false;
    }
  }

  return true;
}
