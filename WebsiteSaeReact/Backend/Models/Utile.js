const specialCaractersRegex = /[\{\}\[\]\"\'\:\;\<\>\(\)]/;


const isAllUnder50Character = list => {
    return Object.values(list).filter(inputValue => inputValue.length <= 50).length === Object.values(list).length
}

const containSpeCaracters = list => {
    return Object.values(list).filter(inputValue => specialCaractersRegex.test(inputValue)).length !== 0
}

module.exports = {
    isAllUnder50Character,
    containSpeCaracters
}