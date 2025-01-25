import { RootState } from '@/redux/store';

export const selectCountries = (state: RootState) => state.countries.countries;
export const selectCountryDetails = (state: RootState) => state.countries.countryDetails;
export const selectLoading = (state: RootState) => state.countries.loading;
export const selectError = (state: RootState) => state.countries.error;
export const selectPage = (state: RootState) => state.countries.page;