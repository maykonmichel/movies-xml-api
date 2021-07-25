import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from 'tsoa';

import {Actor} from './actor';
import {ActorsService, ActorCreationParams} from './actorsService';

@Route('actors')
export class ActorsController extends Controller {
  @Get('{actorId}')
  public async getActor(
    @Path() actorId: number,
    @Query() name?: string,
  ): Promise<Actor | null> {
    return new ActorsService().get(actorId, name);
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createActor(
    @Body() requestBody: ActorCreationParams,
  ): Promise<Actor> {
    this.setStatus(201);
    return new ActorsService().create(requestBody);
  }
}
