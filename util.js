function computeCubicCurveLength(points, ax, ay, bx, by, cx, cy, dx, dy) {
    var pa = [ax, ay];
    var pb = [0, 0];
    var length = 0;
    var deltaX, deltaY;
    
    var increment = 1.0 / (points - 1);
    
    for (var t = increment; t <= 1.0; t += increment) {
        placePoint(pb, t, ax, ay, bx, by, cx, cy, dx, dy);
        
        deltaX = pa[0] - pb[0];
        deltaY = pa[1] - pb[1];
        length += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        pa[0] = pb[0];
        pa[1] = pb[1];
    }
    
    return length;
}

/**
 * Uses the formula from:
 * http://en.wikipedia.org/wiki/B%C3%A9zier_curve#Cubic_B.C3.A9zier_curves
 */
function placePoint(point, t, ax, ay, bx, by, cx, cy, dx, dy) {
    var oneMinust = 1 - t;
    var oneMinust2 = oneMinust * oneMinust;
    var oneMinust3 = oneMinust2 * oneMinust;
    var t2 = t * t;
    var t3 = t2 * t;
    
    var f;
    
    point[0] = oneMinust3 * ax;
    point[1] = oneMinust3 * ay;
    
    f = 3 * oneMinust2 * t;
    point[0] += f * bx;
    point[1] += f * by;
    
    f = 3 * oneMinust * t2;
    point[0] += f * cx;
    point[1] += f * cy;
 
    point[0] += t3 * dx;
    point[1] += t3 * dy;
}

function randomText(letters, words) {
    var ret = "";
    
    for (var i = 0; i < words; i++) {
        var wordLength = 2 + Math.floor(Math.random() * 6);
        
        if (i > 0) {
            ret += ' ';
        }
        
        for (var j = 0; j < wordLength; j++) {
            var letter = Math.random() * letters;
            ret += String.fromCharCode(97 + letter);
        }
    }
    
    return ret;
}