const specialCaractersRegex = /[\{\}\[\]\"\'\:\;\<\>\(\)]/;


const isAllUnder50Character = list => {
    return Object.values(list).filter(inputValue => inputValue.length <= 50).length === Object.values(list).length
}

const containSpeCaracters = list => {
    const filteredValues = Object.values(list).filter(inputValue => {
        const includesAdmin = inputValue.includes("admin")
        return specialCaractersRegex.test(inputValue) || includesAdmin
    })

    return filteredValues.length !== 0
}

module.exports = {
    isAllUnder50Character,
    containSpeCaracters
}