import { Entity, Column, JoinColumn, ManyToOne } from "typeorm"
import { Movie } from "./Movie"

@Entity()
class MovieDirector {

    @Column()
    movie_id!: number;

    @JoinColumn({name: "movie_id"})
    @ManyToOne( () => Movie)
    movieId!: Movie;

    @Column()
    director_name!: string;

}

export {MovieDirector}
