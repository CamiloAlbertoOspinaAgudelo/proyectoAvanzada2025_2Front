import { AddressDTO } from "./place-dto";

export interface EditPlaceDTO {
    title: string,
    description: string,
    address: AddressDTO,
    priceNight: number,
    capMax: number,
    services: string[],
    photoUrls: string[]
}
