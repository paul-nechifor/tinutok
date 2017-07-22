function BezierSpline(array, length, lengths, height) {
    this.array = array;
    this.length = length;
    this.lengths = lengths;
    this.height = height;
}

// TODO: Implement this.
BezierSpline.prototype.getInReverse = function () {
    var ret = new BezierSpline();

    return ret;
};

BezierSpline.prototype.putInChain = function (array, lengths, pointsOffset) {
    var i;

    for (i = 0; i < this.array.length; i++) {
        array[pointsOffset * 6 + i] = this.array[i];
    }

    for (i = 0; i < this.lengths.length; i++) {
        lengths[pointsOffset + i] = this.lengths[i];
    }
};

BezierSpline.prototype.draw = function (ctx, startX, startY, scale) {
    var s = scale !== undefined ? scale : 1;

    ctx.beginPath();
    ctx.moveTo(startX, startY);

    var v = this.array;
    var lastX = startX;
    var lastY = startY;

    for (var i = 0, len = v.length; i < len; i += 6) {
        ctx.bezierCurveTo(
            lastX + v[i+0] * s,
            lastY + v[i+1] * s,
            lastX + v[i+2] * s,
            lastY + v[i+3] * s,
            lastX + v[i+4] * s,
            lastY + v[i+5] * s
        );

        lastX += v[i+4] * s;
        lastY += v[i+5] * s;
    }

    ctx.stroke();
};

BezierSpline.prototype.getRelativeSvgPath = function (startX, startY, scale) {
    var s = scale !== undefined ? scale : 1;

    var v = this.array;
    var points = [];

    for (var i = 0, len = v.length; i < len; i += 6) {
        points.push(v[i+0] * s);
        points.push(v[i+1] * s);
        points.push(v[i+2] * s);
        points.push(v[i+3] * s);
        points.push(v[i+4] * s);
        points.push(v[i+5] * s);
    }

    var ret = 'M' + startX + ' ' + startY + 'c' + points.join(' ');

    return ret;
};
