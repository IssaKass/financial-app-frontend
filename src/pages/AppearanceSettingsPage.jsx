import Page from "@/layouts/Page";
import SettingsLayout from "@/layouts/SettingsLayout";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Typography } from "@/components/ui/typography";
import { THEMES, useTheme } from "@/contexts/ThemeContext";
import {
	CURRENCY_FORMATS,
	DATE_FORMATS,
	selectCurrencyFormat,
	selectDateFormat,
	setCurrencyFormat,
	setDateFormat,
} from "@/features/settings/settingsSlice";
import SettingsSection from "@/layouts/SettingsSection";
import { formatCurrency, formatDate } from "@/utils/format";
import { useDispatch, useSelector } from "react-redux";

const ThemeSelector = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="space-y-4">
			<Typography variant="body2">
				Make it yours! Customize the app's appearance by choosing the color
				theme that suits your taste.
			</Typography>
			<RadioGroup
				onValueChange={(e) => setTheme(e)}
				value={theme}
				defaultValue={theme}
				className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4"
			>
				{Object.values(THEMES).map((theme) => (
					<ThemeSelectorItem key={theme} theme={theme} />
				))}
			</RadioGroup>
		</div>
	);
};

const ThemeSelectorItem = ({ theme }) => {
	return (
		<Label htmlFor={theme} data-theme={theme}>
			<Card className="flex h-[10rem] flex-col overflow-hidden border-2 [&:has([data-state=checked])]:border-primary">
				<div className="h-[100px] border-b-2 border-inherit">
					<div className="flex h-[24px] items-center gap-1 bg-accent px-2">
						<div className="h-[8px] w-[40px] rounded-full bg-primary"></div>
						<div className="h-[8px] w-[40px] rounded-full bg-primary"></div>
						<div className="h-[8px] w-[40px] rounded-full bg-primary"></div>
					</div>
					<div className="flex items-center space-x-2 px-2 py-4">
						<div className="h-8 w-8 rounded-full bg-muted"></div>
						<div className="flex-1 space-y-2">
							<div className="h-4 rounded-full bg-muted"></div>
							<div className="h-4 rounded-full bg-muted"></div>
						</div>
					</div>
				</div>
				<div className="flex flex-1 items-center gap-2 px-2 ">
					<RadioGroupItem
						value={theme}
						id={theme}
						className="border-2 border-primary"
					/>
					<Typography
						variant="subtitle2"
						component="span"
						className="capitalize"
					>
						{theme}
					</Typography>
				</div>
			</Card>
		</Label>
	);
};

const AppearanceSettingsPage = () => {
	const dateFormat = useSelector(selectDateFormat);
	const currencyFormat = useSelector(selectCurrencyFormat);
	const dispatch = useDispatch();

	return (
		<Page title="Appearance">
			<SettingsLayout>
				<SettingsSection title="Theme">
					<ThemeSelector />
				</SettingsSection>
				<SettingsSection title="Formatting">
					<div className="flex items-center gap-4">
						<Typography variant="subtitle2">Date format:</Typography>
						<Select
							defaultValue={dateFormat}
							value={dateFormat}
							onValueChange={(format) => dispatch(setDateFormat(format))}
						>
							<SelectTrigger className="w-[16rem]">
								<SelectValue placeholder="Date format" />
							</SelectTrigger>
							<SelectContent>
								{Object.values(DATE_FORMATS).map((format, index) => (
									<SelectItem key={index} value={format.name}>
										{formatDate(new Date(), format.options)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="flex items-center gap-4">
						<Typography variant="subtitle2">Currency format:</Typography>
						<Select
							defaultValue={currencyFormat}
							value={currencyFormat}
							onValueChange={(format) => dispatch(setCurrencyFormat(format))}
						>
							<SelectTrigger className="w-[12rem]">
								<SelectValue placeholder="Date format" />
							</SelectTrigger>
							<SelectContent>
								{Object.values(CURRENCY_FORMATS).map((format, index) => (
									<SelectItem key={index} value={format.name}>
										{formatCurrency(1234567.89, format.options)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</SettingsSection>
			</SettingsLayout>
		</Page>
	);
};

export default AppearanceSettingsPage;
