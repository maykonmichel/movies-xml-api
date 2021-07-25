import {getRepository} from 'typeorm';

import {Actor} from './actor';

export type ActorCreationParams = Pick<Actor, 'name'>;

export class ActorsService {
  public getAll(): Promise<Array<Actor>> {
    return getRepository(Actor).find();
  }

  public get(id: number): Promise<Actor | null> {
    return getRepository(Actor)
      .findOne({id})
      .then((actor) => actor || null);
  }

  public create(actorCreationParams: ActorCreationParams): Promise<Actor> {
    const actorRepository = getRepository(Actor);
    const actor = new Actor();
    return actorRepository.save({
      ...actor,
      ...actorCreationParams,
    });
  }

  public async delete(id: number): Promise<void> {
    await getRepository(Actor).delete({id});
  }
}
