import { Get, JsonController, NotFoundError, Param } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import characters from '../content/Characters'

const useCases = characters.map((c) => c.useCases)
@JsonController('/usecases')
@Service()
export class UseCaseController {
  /**
   * Retrieve use case by slug
   */
  @Get('/:useCaseSlug')
  public async getUseCaseBySlug(@Param('useCaseSlug') useCaseSlug: string) {
    const useCase = useCases.flat().find((x) => x.id === useCaseSlug)

    if (!useCase) {
      throw new NotFoundError(`use case with slug "${useCaseSlug}" not found.`)
    }
    return useCase
  }

  /**
   * Retrieve all usecases for given character id
   */
  @Get('/character/:type')
  public async getUseCasesByCharType(@Param('type') type: string) {
    const UCs = characters.find((c) => c.type === type)

    if (!UCs) {
      throw new NotFoundError(`Use cases for character with type "${type}" not found.`)
    }

    return UCs.useCases
  }
}
