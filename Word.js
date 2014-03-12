/**
 * A Word is an array of Characters with optional CharacterTransitions between
 * them.
 */
function Word(codes, characterSet, isInReverse) {
    this.codes = codes;
    this.characterSet = characterSet;
    this.isInReverse = isInReverse !== undefined ? isInReverse : false;
    
    this.elements = this.computeElements();
    this.height = this.computeHeight();
}

Word.prototype.computeElements = function () {
    var elements = [];
    
    var cSet = this.characterSet;
    var character, transition;
    
    for (var i = 0, len = this.codes.length; i < len; i++) {
        character = cSet.getCharacter(this.codes[i]);
        if (character === undefined) {
            throw "No such character";
        }
        
        elements.push(character);
        
//        if (i + 1 < len) {
//            transition = cset.getTransition(this.codes[i], this.codes[i + 1]);
//            if (transition !== undefined) {
//                elements.push(transition);
//            }
//        }
    }
    
    return elements;
};

Word.prototype.computeHeight = function () {
    var height = 0;
    
    for (var i = 0, len = this.elements.length; i < len; i++) {
        height += this.elements[i].height;
    }
    
    return height;
};

Word.prototype.getWordInReverse = function () {
    return new Word(this.codes, this.characterSet, !this.isInReverse);
};

Word.prototype.pushIntoElements = function (elements, isInReverse) {
    var cSet = this.characterSet;
    var i, len;
    
    if (isInReverse) {
        // TODO: include transitions.
        for (i = this.codes.length - 1; i >= 0; i--) {
            elements.push(cSet.getCharacter(this.codes[i], isInReverse));
        }
    } else {
        for (i = 0, len = this.elements.length; i < len; i++) {
            elements.push(this.elements[i]);
        }
    }
};