let indexMonthLists = {
    'JAN' :'01',
    'FEB' :'02',
    'MAR' :'03',
    'APR' :'04',
    'MAY' :'05',
    'JUN' :'06',
    'JUL' :'07',
    'AUG' :'08',
    'SEP' :'09',
    'OCT' :'10',
    'NOV' :'11',
    'DEC' :'12'
}

// Extracing UK Store Date
const ukStoreDate = (date) => {
    let indexMonth = 2
    let indexYear = 0
    let day;
    let month= "";
    let year= "";
    if(date[1] === ' '){
        day = `0${date[0]}`
    }else{
        indexMonth = 3
        day = `${date[0]}${date[1]}`
    }
    for(let i = indexMonth; i < date.length ; i++){
        if(date[i] != ' '){
            month = month + date[i]     
        }else{
            indexYear = i + 1
            month = month.toUpperCase()
            break
        }
    }
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracing US Store Date
const usStoreDate = (date) => {
    let indexDay = 0
    let indexYear = 0
    let day;
    let month= "";
    let year= "";

    for(let i = 0 ; i < date.length ; i++){
        if(date[i] != ' '){
            month = month + date[i]     
        }else{
            indexDay = i + 1
            month = month.toUpperCase()
            break
        }
    }

    if(date[indexDay+1] === ','){
        day = `0${date[indexDay]}`
        indexYear = indexDay + 3
    }else{
        indexYear = indexDay + 4
        day = `${date[indexDay]}${date[indexDay+1]}`
    }
    
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracing CA Store Date
const caStoreDate = (date) => {
    let indexDay = 0
    let indexYear = 0
    let day;
    let month= "";
    let year= "";

    for(let i = 0 ; i < date.length ; i++){
        if(date[i] != '.'){
            month = month + date[i]     
        }else{
            indexDay = i + 2
            month = month.toUpperCase()
            break
        }
    }

    if(date[indexDay+1] === ','){
        day = `0${date[indexDay]}`
        indexYear = indexDay + 3
    }else{
        indexYear = indexDay + 4
        day = `${date[indexDay]}${date[indexDay+1]}`
    }
    
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracting GE Store Date
const geStoreDate = (date)=>{
    let day = `${date[0]}${date[1]}`
    let monthList = {
        '01': 'JAN',
        '02': 'FEB',
        '03': 'MAR',
        '04': 'APR',
        '05': 'MAY',
        '06': 'JUN',
        '07': 'JUL',
        '08': 'AUG',
        '09': 'SEP',
        '10': 'OCT',
        '11': 'NOV',
        '12': 'DEC'
    }
    let month = monthList[`${date[3]}${date[4]}`]
    let year = `${date[6]}${date[7]}${date[8]}${date[9]}`
    return [day,month,year,indexMonthLists[month]]
}

// Extracting ES Store Date
const esStoreDate = (date)=>{
    let monthList = {
        'ene.': 'JAN',
        'feb.': 'FEB',
        'mar.': 'MAR',
        'abr.': 'APR',
        'may': 'MAY',
        'jun.': 'JUN',
        'jul.': 'JUL',
        'ago.': 'AUG',
        'sept.': 'SEP',
        'oct.': 'OCT',
        'nov.': 'NOV',
        'dic.': 'DEC'
    }
    let indexMonth = 2
    let indexYear = 0
    let day;
    let month= "";
    let tempMonth= "";
    let year= "";
    if(date[1] === ' '){
        day = `0${date[0]}`
    }else{
        indexMonth = 3
        day = `${date[0]}${date[1]}`
    }
    for(let i = indexMonth; i < date.length ; i++){
        if(date[i] != ' '){
            tempMonth = tempMonth + date[i]     
        }else{
            indexYear = i + 1
            month = monthList[tempMonth]
            break
        }
    }
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracting MX Store Date
const mxStoreDate = (date)=>{
    let monthList = {
        'ene.': 'JAN',
        'feb.': 'FEB',
        'mar.': 'MAR',
        'abr.': 'APR',
        'mayo': 'MAY',
        'jun.': 'JUN',
        'jul.': 'JUL',
        'ago.': 'AUG',
        'sept.': 'SEP',
        'oct.': 'OCT',
        'nov.': 'NOV',
        'dic.': 'DEC'
    }
    let indexMonth = 2
    let indexYear = 0
    let day;
    let month= "";
    let tempMonth= "";
    let year= "";
    if(date[1] === ' '){
        day = `0${date[0]}`
    }else{
        indexMonth = 3
        day = `${date[0]}${date[1]}`
    }
    for(let i = indexMonth; i < date.length ; i++){
        if(date[i] != ' '){
            tempMonth = tempMonth + date[i]     
        }else{
            indexYear = i + 1
            month = monthList[tempMonth]
            break
        }
    }
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracting IT Store Date
const itStoreDate = (date)=>{
    let monthList = {
        'gen': 'JAN',
        'feb': 'FEB',
        'mar': 'MAR',
        'apr': 'APR',
        'mag': 'MAY',
        'giu': 'JUN',
        'lug': 'JUL',
        'ago': 'AUG',
        'set': 'SEP',
        'ott': 'OCT',
        'nov': 'NOV',
        'dic': 'DEC'
    }
    let indexMonth = 2
    let indexYear = 0
    let day;
    let month= "";
    let tempMonth= "";
    let year= "";
    if(date[1] === ' '){
        day = `0${date[0]}`
    }else{
        indexMonth = 3
        day = `${date[0]}${date[1]}`
    }
    for(let i = indexMonth; i < date.length ; i++){
        if(date[i] != ' '){
            tempMonth = tempMonth + date[i]     
        }else{
            indexYear = i + 1
            month = monthList[tempMonth]
            break
        }
    }
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracting FR Store Date
const frStoreDate = (date)=>{
    let monthList = {
        'janv.': 'JAN',
        'févr.': 'FEB',
        'mars': 'MAR',
        'avr.': 'APR',
        'mai': 'MAY',
        'juin': 'JUN',
        'juil.': 'JUL',
        'août': 'AUG',
        'sept.': 'SEP',
        'oct.': 'OCT',
        'nov.': 'NOV',
        'déc.': 'DEC'
    }
    let indexMonth = 2
    let indexYear = 0
    let day;
    let month= "";
    let tempMonth= "";
    let year= "";
    if(date[1] === ' '){
        day = `0${date[0]}`
    }else{
        indexMonth = 3
        day = `${date[0]}${date[1]}`
    }
    for(let i = indexMonth; i < date.length ; i++){
        if(date[i] != ' '){
            tempMonth = tempMonth + date[i]     
        }else{
            indexYear = i + 1
            month = monthList[tempMonth]
            break
        }
    }
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracting NL Store Date
const nlStoreDate = (date)=>{
    let monthList = {
        'jan.': 'JAN',
        'feb.': 'FEB',
        'mrt.': 'MAR',
        'apr.': 'APR',
        'mei.': 'MAY',
        'jun.': 'JUN',
        'jul.': 'JUL',
        'aug.': 'AUG',
        'sep.': 'SEP',
        'okt.': 'OCT',
        'nov.': 'NOV',
        'dec.': 'DEC'
    }
    let indexMonth = 2
    let indexYear = 0
    let day;
    let month= "";
    let tempMonth= "";
    let year= "";
    if(date[1] === ' '){
        day = `0${date[0]}`
    }else{
        indexMonth = 3
        day = `${date[0]}${date[1]}`
    }
    for(let i = indexMonth; i < date.length ; i++){
        if(date[i] != ' '){
            tempMonth = tempMonth + date[i]     
        }else{
            indexYear = i + 1
            month = monthList[tempMonth]
            break
        }
    }
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracting BZ Store Date
const bzStoreDate = (date)=>{
    let monthList = {
        'jan.': 'JAN',
        'fev.': 'FEB',
        'mar.': 'MAR',
        'abr.': 'APR',
        'mai.': 'MAY',
        'jun.': 'JUN',
        'jul.': 'JUL',
        'ago.': 'AUG',
        'set.': 'SEP',
        'out.': 'OCT',
        'nov.': 'NOV',
        'dez.': 'DEC'
    }
    let indexMonth = 2
    let indexYear = 0
    let day;
    let month= "";
    let tempMonth= "";
    let year= "";
    if(date[1] === ' '){
        day = `0${date[0]}`
    }else{
        indexMonth = 3
        day = `${date[0]}${date[1]}`
    }
    for(let i = indexMonth; i < date.length ; i++){
        if(date[i] != ' '){
            tempMonth = tempMonth + date[i]     
        }else{
            indexYear = i + 1
            month = monthList[tempMonth]
            break
        }
    }
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracting SW Store Date
const swStoreDate = (date)=>{
    let monthList = {
        'jan.': 'JAN',
        'febr.': 'FEB',
        'mars': 'MAR',
        'april': 'APR',
        'maj': 'MAY',
        'juni': 'JUN',
        'juli': 'JUL',
        'aug.': 'AUG',
        'sept.': 'SEP',
        'okt.': 'OCT',
        'nov.': 'NOV',
        'dec.': 'DEC'
    }
    let indexMonth = 2
    let indexYear = 0
    let day;
    let month= "";
    let tempMonth= "";
    let year= "";
    if(date[1] === ' '){
        day = `0${date[0]}`
    }else{
        indexMonth = 3
        day = `${date[0]}${date[1]}`
    }
    for(let i = indexMonth; i < date.length ; i++){
        if(date[i] != ' '){
            tempMonth = tempMonth + date[i]     
        }else{
            indexYear = i + 1
            month = monthList[tempMonth]
            break
        }
    }
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracting TK Store Date
const tkStoreDate = (date)=>{
    let monthList = {
        'Oca': 'JAN',
        'Sub': 'FEB',
        'mar': 'MAR',
        'Nis': 'APR',
        'May': 'MAY',
        'Haz': 'JUN',
        'Tem': 'JUL',
        'Agu': 'AUG',
        'Eyl': 'SEP',
        'Eki': 'OCT',
        'Kas': 'NOV',
        'Ara': 'DEC'
    }
    let indexMonth = 2
    let indexYear = 0
    let day;
    let month= "";
    let tempMonth= "";
    let year= "";
    if(date[1] === ' '){
        day = `0${date[0]}`
    }else{
        indexMonth = 3
        day = `${date[0]}${date[1]}`
    }
    for(let i = indexMonth; i < date.length ; i++){
        if(date[i] != ' '){
            tempMonth = tempMonth + date[i]     
        }else{
            indexYear = i + 1
            month = monthList[tempMonth]
            break
        }
    }
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

// Extracting PO Store Date
const poStoreDate = (date)=>{
    let monthList = {
        'sty': 'JAN',
        'lut': 'FEB',
        'mar': 'MAR',
        'kwi': 'APR',
        'maj': 'MAY',
        'cze': 'JUN',
        'lip': 'JUL',
        'sie': 'AUG',
        'wrz': 'SEP',
        'paz': 'OCT',
        'lis': 'NOV',
        'gru': 'DEC'
    }
    let indexMonth = 2
    let indexYear = 0
    let day;
    let month= "";
    let tempMonth= "";
    let year= "";
    if(date[1] === ' '){
        day = `0${date[0]}`
    }else{
        indexMonth = 3
        day = `${date[0]}${date[1]}`
    }
    for(let i = indexMonth; i < date.length ; i++){
        if(date[i] != ' '){
            tempMonth = tempMonth + date[i]     
        }else{
            indexYear = i + 1
            month = monthList[tempMonth]
            break
        }
    }
    for(let i = indexYear; i < date.length ; i++){
        if(date[i] != ' '){
            year = year + date[i]     
        }else{
            break
        }
    }
    return [day,month,year,indexMonthLists[month]]
}

const allDates = {
    'ukStore': ukStoreDate,
    'usStore': usStoreDate,
    'geStore': geStoreDate,
    'esStore': esStoreDate,
    'itStore': itStoreDate,
    'mxStore': mxStoreDate,
    'frStore': frStoreDate,
    'nlStore': nlStoreDate,
    'caStore': caStoreDate,
    'bzStore': bzStoreDate,
    'swStore': swStoreDate,
    'tkStore': tkStoreDate,
    'poStore': poStoreDate,
}

module.exports = { allDates }