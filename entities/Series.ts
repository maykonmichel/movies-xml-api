import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity()
class Series {

    @PrimaryGeneratedColumn()
    series_id!: number;

    @Column()
    series_name!: string;

    @Column()
    year!: number;

    @Column()
    seasons!: number;

    @Column()
    rating!: number;
}

export { Series }