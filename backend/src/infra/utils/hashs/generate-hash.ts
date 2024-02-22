import { createHash } from 'crypto'

export function generateHash(value: string) {
    return createHash('sha256', { encoding: 'utf8' }).update(value).digest('hex')
}