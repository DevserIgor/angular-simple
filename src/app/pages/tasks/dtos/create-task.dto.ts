export class CreateTaskDTO {
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly list: number
    ) {

    }
}