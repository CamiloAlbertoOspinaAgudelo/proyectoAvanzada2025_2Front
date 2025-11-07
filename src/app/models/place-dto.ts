export interface PlaceDTO {
    id: number;
    title: string;
    description: string;
    photoUrls: string[];
    services: string[];
    capMax: number;
    PriceNight: number;
    hostId: string;
    address: AddressDTO;
}

export interface AddressDTO{
    city: string;
    direction: string;
    location: LocationDTO;
}

export interface LocationDTO{
    lat: number;
    lng: number;
}