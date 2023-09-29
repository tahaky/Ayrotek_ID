import { Body, Delete, Get, InternalServerError, JsonController, NotFoundError, Param, Post } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import { tractionRequest } from '../utils/tractionHelper'

@JsonController('/connections')
@Service()
export class ConnectionController {
  @Get('/getConnectionStatus/:connId')
  public async getConnectionStatus(@Param('connId') connectionId: string) {
    const response = await tractionRequest.get(`/connections/${connectionId}`)
    return response.data
  }

  @Post('/createInvite')
  public async createConnectionInvite(@Body() params: any) {
    const response = await tractionRequest.post(`/connections/create-invitation`, params, {
      params: { auto_accept: true },
    })
    return response.data
  }
}
