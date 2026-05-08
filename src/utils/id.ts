export function generateId(name:string):string{
    return name + Date.now().toString()
}