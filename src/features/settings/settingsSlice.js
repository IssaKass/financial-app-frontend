import { createSlice } from "@reduxjs/toolkit";

export const DATE_FORMATS = {
	DEFAULT: {
		name: "DEFAULT",
		options: { year: "numeric", month: "long", day: "numeric" },
	},
	SHORT: {
		name: "SHORT",
		options: { year: "numeric", month: "short", day: "numeric" },
	},
	NUMERIC: {
		name: "NUMERIC",
		options: { year: "numeric", month: "numeric", day: "numeric" },
	},
	NUMERIC_SHORT: {
		name: "NUMERIC_SHORT",
		options: { year: "2-digit", month: "2-digit", day: "2-digit" },
	},
	LONG_WEEKDAY: {
		name: "LONG_WEEKDAY",
		options: {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		},
	},
};

export const CURRENCY_FORMATS = {
	DEFAULT: {
		name: "DEFAULT",
		options: {
			style: "currency",
			currency: "USD",
		},
	},
	WITHOUT_DECIMALS: {
		name: "WITHOUT_DECIMALS",
		options: {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		},
	},
	WITHOUT_SYMBOL: {
		name: "WITHOUT_SYMBOL",
		options: {
			style: "currency",
			currency: "USD",
			currencyDisplay: "code",
		},
	},
};

const loadSettingsFromLocalStorage = () => {
	const storedSettings = localStorage.getItem("settings");
	return storedSettings ? JSON.parse(storedSettings) : {};
};

const initialState = {
	dateFormat: DATE_FORMATS.DEFAULT.name,
	currencyFormat: CURRENCY_FORMATS.WITHOUT_SYMBOL.name,
	...loadSettingsFromLocalStorage(),
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setDateFormat: (state, action) => {
			state.dateFormat = action.payload;
			localStorage.setItem("settings", JSON.stringify(state));
		},
		setCurrencyFormat: (state, action) => {
			state.currencyFormat = action.payload;
			localStorage.setItem("settings", JSON.stringify(state));
		},
	},
});

export const selectDateFormat = (state) => state.settings.dateFormat;
export const selectCurrencyFormat = (state) => state.settings.currencyFormat;

export const { setDateFormat, setCurrencyFormat } = settingsSlice.actions;
export default settingsSlice.reducer;
