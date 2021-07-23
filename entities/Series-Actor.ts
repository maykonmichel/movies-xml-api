import { Entity, Column, JoinColumn, ManyToOne } from "typeorm"
import { Series } from "./Series"

@Entity()
class SeriesActor {

    @Column()
    series_id!: number;

    @JoinColumn({name: "series_id"})
    @ManyToOne( () => Series)
    seriesId!: Series;

    @Column()
    actor_name!: string;

}

export { SeriesActor }
