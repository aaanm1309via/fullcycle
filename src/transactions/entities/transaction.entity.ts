import {Model, Column, Table, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Account } from 'src/accounts/entities/account.entity';
import { ToNumber } from '../../common/db/to-number.decorator';


export enum TransactionCategory {
    CATEGORY1 = 'despesas fixas',
    CATEGORY2 = 'despesas variaveis'
}

export const TransactionCategoryList : String[]= Object.values(TransactionCategory);

export enum TransactionType {
    CREDIT = 'credito',
    DEBIT = 'debito'
}

export const TransactionTypeList : String[] = Object.values(TransactionType);

@Table({
    tableName: 'transactions',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

export class Transaction extends Model {

    @PrimaryKey
    @Column({ 
        type: DataType.UUID, 
        defaultValue: DataType.UUIDV4
    })
    id: string;
    
    @Column({allowNull: false})
    payment_date: Date;
    
    @Column({allowNull: false})
    name: string;
    
    @Column({allowNull: false})
    description: string;
    
    @Column({allowNull: false})
    category: TransactionCategory;
    
    @ToNumber
    @Column({
        allowNull: false, 
        type: DataType.DECIMAL(10, 2)
    })
    amount: number;

    @Column({allowNull: false})
    type: TransactionType;

    @ForeignKey((): typeof Account => Account)
    @Column({ 
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false})
    account_id: string;

    @BelongsTo((): typeof Account => Account)
    account: Account;

}
