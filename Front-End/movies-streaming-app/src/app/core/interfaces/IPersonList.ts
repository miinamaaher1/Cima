import { IPerson } from "./IPerson";

export interface IPersonList {
    page: number;
    results: IPerson[];
    total_pages: number;
    total_results: number;
}
