function BezierSplineBuilder() {
    this.array = [];
}

BezierSplineBuilder.LENGTH_COMPUTING_POINTS = 1000;

BezierSplineBuilder.prototype.build = function () {
    var v = this.array;
    var length = 0;
    var lengths = [];
    var height = 0;

    for (var i = 0, k = 0, len = v.length; i < len; i += 6, k++) {
        lengths[k] = computeCubicCurveLength(
            BezierSplineBuilder.LENGTH_COMPUTING_POINTS,
            0, 0,
            v[i+0], v[i+1],
            v[i+2], v[i+3],
            v[i+4], v[i+5]
        );
            
        length += lengths[k];
        
        height += v[i + 5];
    }
    
    var typedArray = new Float64Array(v);
    var typedLengths = new Float64Array(lengths);
    
    return new BezierSpline(typedArray, length, typedLengths, height);
};

BezierSplineBuilder.prototype.addCubic = function (c1x, c1y, c2x, c2y, tx, ty) {
    this.array.push(c1x, c1y, c2x, c2y, tx, ty);
};

BezierSplineBuilder.prototype.addMatchingCubic = function (c2x, c2y, tx, ty) {
    if (this.array.length === 0) {
        throw "Cannot be first";
    }
    
    var v = this.array;
    var n = v.length;
    v.push(v[n-2]-v[n-4], v[n-1]-v[n-3], c2x, c2y, tx, ty);
};

// From: http://stackoverflow.com/questions/3162645
BezierSplineBuilder.prototype.addQuadratic = function (cx, cy, tx, ty) {
    var f = 2.0 / 3.0;
    this.array.push(
        f*cx, f*cy,
        tx+f*(cx-tx), ty+f*(cy-ty),
        tx, ty);
};