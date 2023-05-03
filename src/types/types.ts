import { ClothType } from "generated/api"

export type ClothItem = {
    baseImage: string,
    cost: number,
    type: ClothType
}