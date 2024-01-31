import {
	CURRENCY_FORMATS,
	DATE_FORMATS,
	selectCurrencyFormat,
	selectDateFormat,
} from "@/features/settings/settingsSlice";
import { useSelector } from "react-redux";

export const formatCurrency = (amount = 0, format) => {
	if (format) {
		return new Intl.NumberFormat("en-US", format).format(amount);
	}

	const currencyFormat = useSelector(selectCurrencyFormat);

	return new Intl.NumberFormat(
		"en-US",
		CURRENCY_FORMATS[currencyFormat].options
	).format(amount);
};

export const formatDate = (date, format) => {
	const dateInstance = new Date(date);

	if (format) {
		return new Intl.DateTimeFormat("en-US", format).format(dateInstance);
	}

	const dateFormat = useSelector(selectDateFormat);

	return new Intl.DateTimeFormat(
		"en-US",
		DATE_FORMATS[dateFormat].options
	).format(dateInstance);
};

export const formatSeconds = (seconds) => {
	if (!seconds || seconds === 0) {
		return "0s";
	}

	if (!isNaN(seconds) && !Number.isInteger(seconds)) {
		seconds = Math.round(seconds);
	}

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = Math.floor(seconds % 60);

	let formattedTime = "";

	if (hours > 0) {
		formattedTime += `${hours}h `;
	}

	if (minutes > 0) {
		formattedTime += `${minutes}m `;
	}

	if (remainingSeconds > 0) {
		formattedTime += `${remainingSeconds}s`;
	}

	return formattedTime.trim();
};

export const firstLetterUppercase = (word) => String(word).toUpperCase()[0];
