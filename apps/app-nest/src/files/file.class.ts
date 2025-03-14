export class MFile {
    originalname: string
    buffer: Buffer

    constructor(file) {
        this.originalname = file.originalname
        this.buffer = file.buffer
    }
}