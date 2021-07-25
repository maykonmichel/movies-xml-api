import {getRepository} from 'typeorm';

import {Actor} from './actor';

export type ActorCreationParams = Pick<Actor, 'name'>;

export class ActorsService {
  public get(id: number, name?: string): Promise<Actor | null> {
    return getRepository(Actor)
      .findOne({id, name})
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
}
