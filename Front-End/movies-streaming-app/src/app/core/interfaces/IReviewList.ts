import { IReview } from "./IReview";

export interface IReviewList{
    id : number ,
    results : IReview[],
    page : number ,
    total_pages: number,
    total_results: number
}