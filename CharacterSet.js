function CharacterSet(topTurner, bottomTurner, turnerHeight, turnerWidth,
        minimumSpace) {
    this.topTurner = topTurner;
    this.bottomTurner = bottomTurner;
    this.turnerHeight = turnerHeight;
    this.turnerWidth = turnerWidth;
    this.minimumSpace = minimumSpace;

    this.characters = {};
    this.revCharacters = {};
    this.transitions = {};
    this.revTransitions = {};
}

CharacterSet.prototype.putCharacter = function (code, character) {
    this.characters[code] = character;
    this.revCharacters[code] = character.getInReverse();
};

CharacterSet.prototype.putTransition = function (code1, code2, transition) {
    var joined = code1 + code2;
    this.transitions[joined] = transition;
    this.revTransitions[joined] = transition.getInReverse();
};

CharacterSet.prototype.getCharacter = function (code, isInReverse) {
    if (isInReverse) {
        return this.revCharacters[code];
    } else {
        return this.characters[code];
    }
};

CharacterSet.prototype.getTransition = function (code1, code2, isInReverse) {
    var joined = code1 + code2;
    if (isInReverse) {
        return this.revTransitions[joined];
    } else {
        return this.transitions[joined];
    }
};

CharacterSet.prototype.characterExists = function (code) {
    return code in this.characters;
};
