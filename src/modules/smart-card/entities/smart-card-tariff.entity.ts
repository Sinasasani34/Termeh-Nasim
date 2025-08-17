import { BaseEntity } from "src/common/abstracts/base.entity";
import { Column } from "typeorm";

export class smartCardTariffEntity extends BaseEntity {
    @Column()
    title: string;

    @Column({ type: 'number' })
    price: number;

    @Column()
    description: string;

    @Column({ default: true, nullable: true })
    isActive: boolean;
}