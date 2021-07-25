import {getRepository} from 'typeorm';

import {Director} from './director';

export type DirectorCreationParams = Pick<Director, 'name'>;

export class DirectorsService {
  public getAll(): Promise<Array<Director>> {
    return getRepository(Director).find();
  }

  public get(id: number): Promise<Director | null> {
    return getRepository(Director)
      .findOne({id})
      .then((director) => director || null);
  }

  public create(
    directorCreationParams: DirectorCreationParams,
  ): Promise<Director> {
    const directorRepository = getRepository(Director);
    const director = new Director();
    return directorRepository.save({
      ...director,
      ...directorCreationParams,
    });
  }

  public async delete(id: number): Promise<void> {
    await getRepository(Director).delete({id});
  }
}
