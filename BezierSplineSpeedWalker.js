function BezierSplineSpeedWalker(bezierSplineWalker) {
    this.bezierSplineWalker = bezierSplineWalker;
    
    this.pointA = [0, 0];
    this.pointB = [0, 0];
    this.linePos = 0;
    this.lineLength = 0;
    this.dx = 0;
    this.dy = 0;
    
    this.bezierSplineWalker.next();
    this.bezierSplineWalker.getPoint(this.pointB);
    
    this.x = this.pointB[0];
    this.y = this.pointB[1];
    this.r = 0;
}

BezierSplineSpeedWalker.prototype.advanceBy = function (ammount) {    
    var ammountLeft = ammount;
    
    while (this.linePos + ammountLeft > this.lineLength) {
        ammountLeft -= this.lineLength - this.linePos;
        this.linePos = 0;
        
        // If can't advance any more. Set the point to the last point of the
        // last curve.
        if (!this.bezierSplineWalker.next()) {
            this.x = this.pointB[0];
            this.y = this.pointB[1];
            return false;
        }
        
        this.pointA[0] = this.pointB[0];
        this.pointA[1] = this.pointB[1];
        
        this.bezierSplineWalker.getPoint(this.pointB);
        
        this.dx = this.pointB[0] - this.pointA[0];
        this.dy = this.pointB[1] - this.pointA[1];
        this.r = Math.atan2(this.dy, this.dx);
        
        this.lineLength = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
    }
    
    this.linePos += ammountLeft;
    
    var ratio = this.linePos / this.lineLength;
    this.x = this.pointA[0] + ratio * this.dx;
    this.y = this.pointA[1] + ratio * this.dy;
    
    return true;
};