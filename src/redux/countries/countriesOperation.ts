import {createAsyncThunk} from "@reduxjs/toolkit";
import {Country, CountryDetails} from "@/redux/countries/types";

export const fetchCountries = createAsyncThunk<Country[], void,
	{ rejectValue: string }>(
	'countries/fetchCountries',
	async (_, thunkAPI) => {
		try {
			const response = await fetch('http://localhost:3123/countries');
			const data = await response.json();
			return data.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const fetchCountryDetails = createAsyncThunk<CountryDetails, string,
	{ rejectValue: string }>(
	'countries/fetchCountryDetails',
	async (countryCode: string, thunkAPI) => {
		try {
			const response = await fetch(`http://localhost:3123/countries/${countryCode}`);
			const data = await response.json();
			return data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);