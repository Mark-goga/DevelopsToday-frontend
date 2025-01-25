import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchCountries = createAsyncThunk(
	'countries/fetchCountries',
	async (_, thunkAPI) => {
		try {
			const response = await fetch('http://localhost:3123/countries');
			const data = await response.json();
			return data.data; // Return the country list
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const fetchCountryDetails = createAsyncThunk(
	'countries/fetchCountryDetails',
	async (countryCode: string, thunkAPI) => {
		try {
			const response = await fetch(`http://localhost:3123/countries/${countryCode}`);
			const data = await response.json();
			return data; // Return country details
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);