import { AddressDTO } from "./place-dto";

export interface CreatePlaceDTO {
    title: string,
    description: string,
    address: AddressDTO,
    priceNight: number,
    capMax: number,
    services: string[],
    photoUrls: string[]
}
