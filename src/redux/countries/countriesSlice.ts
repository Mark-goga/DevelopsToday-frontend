import {createSlice} from "@reduxjs/toolkit";
import {fetchCountries, fetchCountryDetails} from "@/redux/countries/countriesOperation";

interface Country {
	countryCode: string;
	name: string;
}

interface CountriesState {
	countries: Country[];
	countryDetails: CountryDetails | null;
	loading: boolean;
	error: string | null;
}

const initialState: CountriesState = {
	countries: [],
	countryDetails: null,
	loading: false,
	error: null,
};
interface CountryDetails {
	countryInfo: CountryInfo;
	population: PopulationCounts[];
	flag: string;
}
interface PopulationCounts {
	year: number;
	value: number;
}
interface CountryInfo {
	commonName: string;
	officialName: string;
	countryCode: string;
	region: string;
	borders: BorderCountry[] | null;
}
interface BorderCountry {
	commonName: string;
	officialName: string;
	countryCode: string;
	region: string;
	borders: null;
}
const setPending = (state) => {
	state.loading = true;
	state.error = null;
};
const setRejected = (state, action) => {
	state.loading = false;
	state.error = action.payload as string;
}

const countriesSlice = createSlice({
	name: 'countries',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
		// Fetch countries
		.addCase(fetchCountries.pending, (state) => {
			setPending(state);
		})
		.addCase(fetchCountries.fulfilled, (state, action) => {
			state.loading = false;
			state.countries = action.payload;
		})
		.addCase(fetchCountries.rejected, (state, action) => {
			setRejected(state, action)
		})
		// Fetch country details
		.addCase(fetchCountryDetails.pending, (state) => {
			setPending(state);
		})
		.addCase(fetchCountryDetails.fulfilled, (state, action) => {
			state.loading = false;
			state.countryDetails = action.payload;
		})
		.addCase(fetchCountryDetails.rejected, (state, action) => {
			setRejected(state, action)
		});
	},
});

export default countriesSlice.reducer;