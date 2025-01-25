import {createAsyncThunk} from "@reduxjs/toolkit";
import {Country, CountryDetails} from "@/redux/countries/types";
import {API_URL} from "@/app/constants/apiUrl";


export const fetchCountries = createAsyncThunk<Country[], number,
	{ rejectValue: string }>(
	'countries/fetchCountries',
	async (page: number, thunkAPI) => {
		console.log(API_URL)
		try {
			const response = await fetch(`${API_URL}/countries?page=${page}&perPage=10`);
			if(!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `Failed to fetch country details`);
			}
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
			const response = await fetch(`${API_URL}/countries/${countryCode}`);
			if(!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `Failed to fetch country details`);
			}
			const data = await response.json();
			return data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);