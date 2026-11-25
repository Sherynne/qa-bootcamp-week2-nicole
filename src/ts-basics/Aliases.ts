
type Employee={
readonly id:number,
    name:string,
    retire:(Date: Date) => void}

let employee: Employee={
id:1,
    name: 'Mosh',
    retire:(Date: Date) => {
        console.log(Date);
    }
};