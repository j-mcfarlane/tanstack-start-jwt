import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'

@Injectable()
export class StringEncryptor {
    public async compare(text: string, hash: string): Promise<boolean> {
        return await argon2.verify(hash, text)
    }

    public async generate(text: string): Promise<string> {
        return await argon2.hash(text)
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
