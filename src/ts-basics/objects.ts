
let employees:{
    readonly id:number,
    name:string,
    retire:(Date: Date) => void
} = {
    id:1,
    name: 'Mosh',
    retire:(Date: Date) => {
        console.log(Date);
    }
};