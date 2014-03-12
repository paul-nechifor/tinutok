function Text(characterSet, height, string) {
    this.characterSet = characterSet;
    this.height = height;
    this.width = -1;
    
    var stringWords = this.getStringWords(string);
    this.words = this.getWords(stringWords);
    this.index = 0;
    
    this.elements = this.fillElements();
    
    ////////////////////////////////this.lines = this.extractLines();
}

Text.prototype.getStringWords = function (string) {
    // TODO: remove inexistant characters
    // TODO: split into parts correctly.
    
    return string.split(/\s+/);
};

Text.prototype.getWords = function (textWords) {
    var characterSet = this.characterSet;
    return textWords.map(function (textWord) {
        return new Word(textWord, characterSet);
    });
};

Text.prototype.extractLines = function () {
    var lines = [];
    
    var turnerHeight = this.characterSet.turnerHeight;
    var totalWordsExtracted = 0;
    var lineNr = 0;
    
    while (totalWordsExtracted < this.words.length) {
        var height = this.height - (lineNr === 0 ? turnerHeight : 0);
        
        var line = new Line(this.words, totalWordsExtracted, height);
        
        totalWordsExtracted += line.words.length;
        
        
        /**************************************
        
        
        var lineWords = this.extractWords(height);
        
        if (lineWords === null) {
            break;
        }
        
        var isInReverse = lineNr % 2 === 1;
        var lineWordsHeight = this.sumWordsHeight(lineWords);
        var spaceH = (this.height - lineWordsHeight) / (lineWords.length - 1);
        var space = new Space(spaceH, isInReverse);
        
        for (var i = 0, len = lineWords.length; i < len; i++) {
            if (i > 0) {
                elements.push(space);
            }
            
            lineWords[i].pushIntoElements(elements, isInReverse);
        }
        
        lineNr++;*///////////////
    }
    
    return lines;
};

Text.prototype.fillElements = function () {
    var elements = [];
    
    var turnerHeight = this.characterSet.turnerHeight;
    var lineNr = 0;
    
    while (true) {
        var height = this.height - (lineNr === 0 ? turnerHeight : 0);
        var lineWords = this.extractWords(height);
        
        if (lineWords === null) {
            break;
        }
        
        var isInReverse = lineNr % 2 === 1;
        var lineWordsHeight = this.sumWordsHeight(lineWords);
        var spaceH = (this.height - lineWordsHeight) / (lineWords.length - 1);
        var space = new Space(spaceH, isInReverse);
        
        for (var i = 0, len = lineWords.length; i < len; i++) {
            if (i > 0) {
                elements.push(space);
            }
            
            lineWords[i].pushIntoElements(elements, isInReverse);
        }
        
        lineNr++;
    }
    
    return elements;
};

Text.prototype.extractWords = function (maxHeight) {
    var usedHeight = 0;
    var minimumSpace = this.characterSet.minimumSpace;
    
    var extracted = [];
    
    while (true) {
        if (this.index >= this.words.length) {
            if (extracted.length === 0) {
                return null;
            } else {
                return extracted;
            }
        }
        
        var word = this.words[this.index];
        
        if (extracted.length > 0) {
            usedHeight += minimumSpace;
        }
        usedHeight += word.height;
        
        if (usedHeight >= maxHeight) {
            return extracted;
        }
        
        extracted.push(word);
        this.index++;
    }
};

Text.prototype.sumWordsHeight = function (words) {
    var sum = 0;
    
    for (var i = 0, len = words.length; i < len; i++) {
        sum += words[i].height;
    }
    
    return sum;
};

/**
 * Compute the number of points that are needed for a spline to keep all of
 * these elements.
 */
Text.prototype.getNumberOfSplinePoints = function (elements) {
    var ret = 0;
    
    for (var i = 0, len = elements.length; i < len; i++) {
        ret += elements[i].splinePoints;
    }
    
    return ret;
};

/**
 * Compute and return the BezierSpline for this text.
 */
Text.prototype.getSpline = function () {
    var totalPoints = this.getNumberOfSplinePoints(this.elements);
    
    var array = new Float64Array(totalPoints * 6);
    var length = -1; // This is also irrelevant... possibly...
    var lengths = new Float64Array(totalPoints);
    var height = -1; // The height is irrelevant here... I think...
    
    var pointsOffset = 0;
    var element, points;
    
    for (var i = 0, len = this.elements.length; i < len; i++) {
        element = this.elements[i];
        points = element.splinePoints;
        
        element.putInChain(array, lengths, pointsOffset);
        
        pointsOffset += points;
    }
    
    return new BezierSpline(array, length, lengths, height);
};