import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCountries, fetchCountryDetails} from "@/redux/countries/countriesOperation";
import {CountriesState} from "@/redux/countries/types";

const initialState: CountriesState = {
	countries: [],
	countryDetails: null,
	loading: false,
	error: null,
	page: 1,
};

const setPending = (state: CountriesState) => {
	state.loading = true;
	state.error = null;
};
const setRejected = (state: CountriesState, action: PayloadAction<string>) => {
	state.loading = false;
	state.error = action.payload;
}

const countriesSlice = createSlice({
	name: 'countries',
	initialState,
	reducers: {
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
		// Fetch countries
		.addCase(fetchCountries.pending, (state) => {
			setPending(state);
		})
		.addCase(fetchCountries.fulfilled, (state, action) => {
			state.loading = false;
			state.countries = [...state.countries, ...action.payload];
		})
		.addCase(fetchCountries.rejected, (state, action) => {
			setRejected(state, action as PayloadAction<string>)
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
			setRejected(state, action as PayloadAction<string>)
		});
	},
});
export const {setError, setPage} = countriesSlice.actions;
export default countriesSlice.reducer;