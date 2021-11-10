const MoneyExtractOne = (string)=>{
    return string.replace(',','')
}
const MoneyExtractTwo = (string)=>{
    let newString = string.replace('.','')
    return newString.replace(',','.')
}
const functionPatterns = {
    'ukStore': MoneyExtractOne,
    'usStore': MoneyExtractOne,
    'caStore': MoneyExtractOne,
    'esStore': MoneyExtractTwo,
    'poStore': MoneyExtractTwo,
    'frStore': MoneyExtractTwo,
    'geStore': MoneyExtractTwo,
    'mxStore': MoneyExtractOne,
    'nlStore': MoneyExtractTwo,
    'swStore': MoneyExtractTwo,
    'itStore': MoneyExtractTwo,
    'tkStore': MoneyExtractTwo,
    'bzStore': MoneyExtractTwo,
}

module.exports = { functionPatterns }