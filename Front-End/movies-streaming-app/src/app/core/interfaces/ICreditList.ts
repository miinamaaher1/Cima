import { ICast } from './ICast';
import { ICrew } from './ICrew';
export interface ICreditList {
    id: number, 
    crew : ICrew[],
    cast : ICast[]
}