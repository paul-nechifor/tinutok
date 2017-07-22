function Character(commands, scaleX, scaleY) {
    this.spline = null;
    this.isInReverse = false;
    this.height = 0;
    this.splinePoints = 0;

    if (commands === undefined) {
        return;
    }

    this.splinePoints = commands.length;

    var sx = scaleX !== undefined ? scaleX : 1;
    var sy = scaleY !== undefined ? scaleY : 1;

    var builder = new BezierSplineBuilder();

    for (var i = 0, len = commands.length; i < len; i++) {
        var command = commands[i];
        var parts = command.split(/\s+/);
        var numbers = parts.slice(1, parts.length).map(function (e, i) {
            return Number(e) * ((i%2==0) ? sx : sy);
        });

        switch (parts[0]) {
        case 'c':
            builder.addCubic.apply(builder, numbers);
            break;
        case 'mc':
            builder.addMatchingCubic.apply(builder, numbers);
            break;
        case 'q':
            builder.addQuadratic.apply(builder, numbers);
            break;
        default:
            throw 'Forgot to implement it.';
            break;
        }
    }

    this.spline = builder.build();
    this.height = this.spline.height;
}

Character.prototype.getInReverse = function () {
    var c = new Character();

    c.spline = this.spline.getInReverse();
    c.isInReverse = true;
    c.splinePoints = this.splinePoints;
    c.height = this.height;

    return c;
};

Character.prototype.draw = function (ctx, startX, startY, sx, sy) {
    this.spline.draw(ctx, startX, startY, sx, sy);
};

Character.prototype.putInChain = function (array, lengths, pointsOffset) {
    this.spline.putInChain(array, lengths, pointsOffset);
};
