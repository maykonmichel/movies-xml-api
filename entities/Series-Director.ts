import { Entity, Column, JoinColumn, ManyToOne } from "typeorm"
import { Series } from "./Series"

@Entity()
class SeriesDirector {

    @Column()
    series_id!: number;

    @JoinColumn({name: "series_id"})
    @ManyToOne( () => Series)
    seriesId!: Series;

    @Column()
    director_name!: string;

}

export { SeriesDirector }
