export class CreateListDTO{
    constructor(
        public readonly name: string, 
        public readonly description: string, 
        public readonly category: number,
        public readonly user: number
    ){}
}