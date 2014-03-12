function main() {
    var width = 1920;
    var height = 1080;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 1;


    var string = randomText(6, 4);
    var characterSet = buildCharacterSet();
    var text = new Text(characterSet, 500, string);

    var spline = text.getSpline();
    //console.log(spline.getRelativeSvgPath(0, 0));
    spline.draw(ctx, 50, 10, 10);

    var walker = new BezierSplineWalker(spline, 0.5, 50, 10, 10);

    var sWalker = new BezierSplineSpeedWalker(walker);
    var morePoints = true;

    function doNextPoint() {
        if (morePoints) {
            setTimeout(doNextPoint, 0);
        }
        var x = sWalker.x;
        var y = sWalker.y;
        var len = 4;

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x-len, y);
        ctx.lineTo(x+len, y+len);
        ctx.stroke();

        morePoints = sWalker.advanceBy(0.5);
    }

    doNextPoint();
}
