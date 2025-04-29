import { IImage } from "./IImage";

export interface IImageList {
    id : number,
    backdrops : IImage[],
    logos : IImage[],
    posters : IImage[]
}