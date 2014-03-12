function BezierSplineWalker(bezierSpline, ammount, startX, startY, scale) {
    this.bezierSpline = bezierSpline;
    this.ammount = ammount;
    this.lastX = startX;
    this.lastY = startY;
    this.scale = scale !== undefined ? scale : 1;
    
    this.index = -1;
    this.increment = 1;
    this.t = 1;
    this.arrayIndex = -6;
    this.curveNumbers = new Float64Array(6);
}

/**
 * Advances to the new point and returns true or returns false if there are no
 * more points. Needs to be called before the first point is requested.
 */
BezierSplineWalker.prototype.next = function () {
    // Things that aren't changed.
    var array = this.bezierSpline.array;
    var lengths = this.bezierSpline.lengths;
    
    this.t += this.increment;
    
    if (this.t > 1) {
        this.index++;
        this.arrayIndex += 6;
        
        // Check if there are more curves.
        if (this.index >= lengths.length) {
            return false; // Reached end.
        }
        
        // Move the offset to the last point of the previous curve.
        if (this.index > 0) {
            this.lastX += this.curveNumbers[4];
            this.lastY += this.curveNumbers[5];
        }
        
        // Copy and transform the current curve numbers into curveNumbers for
        // faster access.
        for (var i = 0; i < 6; i++) {
            this.curveNumbers[i] = array[this.arrayIndex + i] * this.scale;
        }
        
        // Computing the total number of points that will be generated for this
        // new curve.
        var totalPoints = lengths[this.index] / this.ammount;
        if (totalPoints < 4) {
            totalPoints = 4;
        }
        
        this.increment = 1 / (totalPoints - 1);
        
        // If this is not the first curve, skip the first point of the curve
        // because it is identical to the last point of the previous curve.
        if (this.index === 0) {
            this.t = 0;
        } else {
            this.t = this.increment;
        }
    }
    
    return true;
};

BezierSplineWalker.prototype.getPoint = function (point) {
    var v = this.curveNumbers;
    
    placePoint(point, this.t,
            0, 0,
            v[0], v[1],
            v[2], v[3],
            v[4], v[5]);
            
    point[0] += this.lastX;
    point[1] += this.lastY;
};