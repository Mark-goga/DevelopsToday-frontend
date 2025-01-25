export interface Country {
	countryCode: string;
	name: string;
}

export interface CountriesState {
	countries: Country[];
	countryDetails: CountryDetails | null;
	loading: boolean;
	error: string | null;
	page: number;
}

export interface CountryDetails {
	countryInfo: CountryInfo;
	population: PopulationCounts[];
	flag: string;
}

export interface PopulationCounts {
	year: number;
	value: number;
}

export interface CountryInfo {
	commonName: string;
	officialName: string;
	countryCode: string;
	region: string;
	borders: BorderCountry[];
}

export interface BorderCountry {
	commonName: string;
	officialName: string;
	countryCode: string;
	region: string;
	borders: null;
}
