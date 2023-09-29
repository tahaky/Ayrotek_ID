import type { CustomCharacter } from '../content/types'

import { Get, JsonController, NotFoundError, Param } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import characters from '../content/Characters'

@JsonController('/characters')
@Service()
export class CharacterController {
  /**
   * Retrieve character by id
   */
  @Get('/:characterId')
  public async getCharacterById(@Param('characterId') characterId: string) {
    const character = characters.find((x) => x.type === characterId)

    if (!character) {
      throw new NotFoundError(`character with characterId "${characterId}" not found.`)
    }

    return character
  }

  /**
   * Retrieve all characters
   */
  @Get('/')
  public async getCharacters() {
    const arr: CustomCharacter[] = []
    characters.forEach((char) => {
      arr.push({
        ...char,
      })
    })
    return arr
  }
}
