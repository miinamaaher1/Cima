import { ISeries } from "./ISeries";

export interface ISeriesList{
    page : number ,
    results : ISeries[] ,
    total_pages: number,
    total_results: number
}