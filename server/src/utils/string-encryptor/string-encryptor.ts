import { Injectable } from '@nestjs/common'
import { randomBytes, pbkdf2Sync } from 'crypto'

@Injectable()
export class StringEncryptor {
    private readonly ITERATIONS = 10000
    private readonly KEY_LENGTH = 64
    private readonly DIGEST = 'sha512'

    public compare(text: string, hash: string): boolean {
        const [salt, storedHash] = hash.split(':')
        const hashBuffer = pbkdf2Sync(text, salt, this.ITERATIONS, this.KEY_LENGTH, this.DIGEST)

        return hashBuffer.toString('hex') === storedHash
    }

    public hash(text: string): string {
        const salt = randomBytes(16).toString('hex')
        const hashBuffer = pbkdf2Sync(text, salt, this.ITERATIONS, this.KEY_LENGTH, this.DIGEST)

        return `${salt}:${hashBuffer.toString('hex')}`
    }

    public generateRandomString(count: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        let result = ''

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            result += characters[randomIndex]
        }
        return result
    }

    public generateRandomDigitCode(): number {
        return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    }
}
