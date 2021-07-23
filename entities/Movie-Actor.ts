import { Entity, Column, JoinColumn, ManyToOne } from "typeorm"
import { Movie } from "./Movie"

@Entity()
class MovieActor {

    @Column()
    movie_id!: number;

    @JoinColumn({name: "movie_id"})
    @ManyToOne( () => Movie)
    movieId!: Movie;

    @Column()
    actor_name!: string;

}

export {MovieActor}
