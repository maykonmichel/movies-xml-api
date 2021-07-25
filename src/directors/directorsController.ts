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

import {Director} from './director';
import {DirectorCreationParams, DirectorsService} from './directorsService';

@Route('directors')
export class DirectorsController extends Controller {
  @Get()
  public async getActors(): Promise<Array<Director>> {
    return new DirectorsService().getAll();
  }

  @Get('{directorId}')
  public async getActor(@Path() directorId: number): Promise<Director | null> {
    return new DirectorsService().get(directorId);
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createActor(
    @Body() requestBody: DirectorCreationParams,
  ): Promise<Director> {
    this.setStatus(201);
    return new DirectorsService().create(requestBody);
  }

  @Delete('{directorId}')
  public async deleteActor(@Path() directorId: number): Promise<void> {
    await new DirectorsService().delete(directorId);
  }
}
