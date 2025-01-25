import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchCountries, fetchCountryDetails} from "@/redux/countries/countriesOperation";
import {CountriesState} from "@/redux/countries/types";

const initialState: CountriesState = {
	countries: [],
	countryDetails: null,
	loading: false,
	error: null,
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

export default countriesSlice.reducer;