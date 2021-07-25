import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
} from 'tsoa';

import {Actor} from './actor';
import {ActorCreationParams, ActorsService} from './actorsService';

@Route('actors')
export class ActorsController extends Controller {
  @Get()
  public async getActors(): Promise<Array<Actor>> {
    return new ActorsService().getAll();
  }

  @Get('{actorId}')
  public async getActor(@Path() actorId: number): Promise<Actor | null> {
    return new ActorsService().get(actorId);
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createActor(
    @Body() requestBody: ActorCreationParams,
  ): Promise<Actor> {
    this.setStatus(201);
    return new ActorsService().create(requestBody);
  }

  @Delete('{actorId}')
  public async deleteActor(@Path() actorId: number): Promise<void> {
    await new ActorsService().delete(actorId);
  }
}
