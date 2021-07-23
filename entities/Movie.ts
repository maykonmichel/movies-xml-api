import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Movie {

    @PrimaryGeneratedColumn()
    movie_id!: number;

    @Column()
    movie_name!: string;

    @Column()
    year!: number;

    @Column()
    rating!: number;
}

export { Movie };