function Teste (a: number) {
    switch(a) {
        case 0: return 'Client 0'
        case 1: return 'Client 1'
        case 2: return 'Client 2'
        case 3: return 'Client 3'
        case 4: return 'Client 4'
        case 5: return 'Client 5'
        case 6: return 'Client 6'
        case 7: return 'Client 7'
        case 8: return 'Client 8'
        case 9: return 'Client 9'
        case 10: return 'Client 10'
        case 11: return 'Client 11'
    }
}

const date = new Date()
const currentMonth = parseInt(date.getMonth().toString())

const a = Teste(currentMonth)

console.log(a)