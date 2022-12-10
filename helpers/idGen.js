function idNew(arrayID) {
    let genID = 0;
    do { genID++; }
    while (arrayID.some(element => element === genID))
    return genID;
}

module.exports = idNew;