import { Injectable } from '@angular/core'
import { customAlphabet } from 'nanoid'
const getTwoNumbers = customAlphabet('1234567890', 2)
const getTwoCharacters = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 2)

@Injectable({
  providedIn: 'root',
})
export class IdHelperService {
  constructor() {}

  static getSimpleId(): string {
    return `${getTwoCharacters()}x${getTwoNumbers()}`
  }
}
