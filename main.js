function main() {
    var width = 1000;
    var height = 600;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
 
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 1;
    
    
    var string = randomText(12, 10);
    var characterSet = buildCharacterSet();
    var text = new Text(characterSet, 500, string);
    
    var spline = text.getSpline();
    console.log(spline.getRelativeSvgPath(0, 0));
    spline.draw(ctx, 50, 10, 5);
        
    var walker = new BezierSplineWalker(spline, 0.5, 50, 10, 5);

    var sWalker = new BezierSplineSpeedWalker(walker);
    var morePoints = true;
    
    function doNextPoint() {
        if (morePoints) {
            setTimeout(doNextPoint, 0);
        }
        var x = sWalker.x;
        var y = sWalker.y;
        var len = 2;
        
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x-len, y);
        ctx.lineTo(x+len, y+len);
        ctx.stroke();
        
        morePoints = sWalker.advanceBy(0.5);
    }
    
    doNextPoint();
}
