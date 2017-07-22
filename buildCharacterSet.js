function buildCharacterSet() {
    var turnerHeight = 4;
    var turnerWidth = 8;
    var minimumSpace = 2;

    var topTurner = new Character([
        "q 0 -4 4 -4",
        "q 4 0 4 4"]);

    var bottomTurner = new Character([
        "q 0 4 4 4",
        "q 4 0 4 -4"]);

    var characterSet = new CharacterSet(topTurner, bottomTurner, turnerHeight,
            turnerWidth, minimumSpace);

    characterSet.putCharacter('a', new Character([
        "q 0 2 2 2",
        "q 2 0 2 -1",
        "q 0 -1 -1 -1",
        "q -1 0 -1 2",
        "q 0 2 -2 2"]));

    characterSet.putCharacter('b', new Character([
        "q 0 1 -2 1",
        "q 2 0 2 1"]));

    characterSet.putCharacter('c', new Character([
        "q -1.5 0 -1.5 2",
        "q 0 2 1.5 2"]));

    characterSet.putCharacter('d', new Character([
        "q 0 2.5 -1 2.5",
        "q -1 0 -1 -1",
        "q 0 -1 1 -1",
        "q 1 0 1 2.5"]));

    characterSet.putCharacter('e', new Character([
        "q -4 0 -4 4",
        "q 0 1 1 1",
        "q 1 0 1 -1",
        "q 0 -1 1 -1",
        "q 1 0 1 2"]));

    characterSet.putCharacter('f', new Character([
        "q 0 0 0 3",
        "q 0 1 -1 1",
        "q -1 0 -1 -1",
        "q 0 -1.5 2 -1.5",
        "q 2 0 2 2",
        "q 0 2 -2 2"]));

    characterSet.putCharacter('g', new Character([
        "q 0 0 0 1",
        "q -3 0 -3 1.5",
        "q 0 -0.75 1.5 -0.75",
        "q 1.5 0 1.5 1.5"]));

    characterSet.putCharacter('h', new Character([
        "q 0 0 0 1",
        "q 0 -0.5 -1 -0.5",
        "q -3 0 -3 2",
        "q 0 2 3 2",
        "q 2 0 2 -1",
        "q 0 2.5 -1 2.5"]));

    characterSet.putCharacter('i', new Character([
        "q 0 2 -1 2",
        "q -1 0 -1 4",
        "q 0 -3 2 -3",
        "q 2 0 2 -3",
        "q 0 4 -1 4",
        "q -1 0 -1 2"]));

    characterSet.putCharacter('j', new Character([
        "q 0 0 0 2",
        "q -1 0 -1 1",
        "q 0 1 1 1",
        "q 1.5 0 1.5 -1.5",
        "q 0 -2 -1.5 -2",
        "q -2.5 0 -2.5 2",
        "q 0 3 1.5 3",
        "q 1 0 1 1"]));

    characterSet.putCharacter('k', new Character([
        "q 0 0 0 5",
        "q 0 -1.5 1 -1.5",
        "q 1 0 1 -1",
        "q 0 -2 -2 -2",
        "q -2 0 -2 2.5",
        "q 0 3 2 3"]));

    characterSet.putCharacter('l', new Character([
        "q 0 2 -1 2",
        "q 3 0 3 3",
        "q 0 1 -1 1",
        "q -1 0 -1 -1",
        "q 0 -1 1 -1",
        "q 1 0 1 1",
        "q 0 3 -3 3",
        "q 1 0 1 2"]));

    return characterSet;
}
