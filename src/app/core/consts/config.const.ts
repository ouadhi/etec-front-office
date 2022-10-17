/**
 * 	DEFAULTS
 *  DEFAULTS_COLORS
 *  CUSTOM_CSS
 *  DEFAULTS_THEM_OPTIONS
 *  DEFAULT_CONFIG
 */

type DefaultsImagesType = { [k: string]: { path: string } | null };

export const DEFAULTS_IMAGES: DefaultsImagesType = {
	logo: null,
	smallLogo: null,
	userAvatar: null,
	sectionsIcon: null,
};
export const CUSTOM_CSS = {
	customCss: ``,
};

export const DEFAULT_FOOTER = {
	footer : ''
}

export const DEFAULTS_COLORS = {
	backgroundColor: 'rgb(235, 235, 235)',
	primary50: 'rgb(232, 243, 245)',
	primary100: 'rgb(197, 224, 230)',
	primary200: 'rgb(158, 204, 213)',
	primary300: 'rgb(119, 183, 196)',
	primary400: 'rgb(90, 167, 183)',
	primary500: 'rgb(61, 152, 170)',
	primary600: 'rgb(55, 144, 163)',
	primary700: 'rgb(47, 133, 153)',
	primary800: 'rgb(39, 123, 144)',
	primary900: 'rgb(26, 106, 127)',
	primaryA100: 'rgb(184, 239, 255)',
	primaryA200: '#85e3ff',
	primaryA400: 'rgb(82, 215, 255)',
	primaryA700: 'rgb(57, 209, 255)',
	primaryContrast50: 'rgb(0, 0, 0)',
	primaryContrast100: 'rgb(0, 0, 0)',
	primaryContrast200: 'rgb(0, 0, 0)',
	primaryContrast300: 'rgb(0, 0, 0)',
	primaryContrast400: 'rgb(0, 0, 0)',
	primaryContrast500: 'rgb(255, 255, 255)',
	primaryContrast600: 'rgb(255, 255, 255)',
	primaryContrast700: 'rgb(255, 255, 255)',
	primaryContrast800: 'rgb(255, 255, 255)',
	primaryContrast900: 'rgb(255, 255, 255)',
	primaryContrastA100: 'rgb(0, 0, 0)',
	primaryContrastA200: 'rgb(0, 0, 0)',
	primaryContrastA400: 'rgb(0, 0, 0)',
	primaryContrastA700: 'rgb(0, 0, 0)',
	accent50: 'rgb(230, 243, 240)',
	accent100: 'rgb(191, 224, 218)',
	accent200: 'rgb(149, 204, 194)',
	accent300: 'rgb(107, 184, 170)',
	accent400: 'rgb(75, 168, 151)',
	accent500: 'rgb(43, 153, 133)',
	accent600: 'rgb(38, 145, 125)',
	accent700: 'rgb(32, 134, 114)',
	accent800: 'rgb(26, 124, 104)',
	accent900: 'rgb(16, 107, 85)',
	accentA100: 'rgb(160, 255, 230)',
	accentA200: 'rgb(109, 255, 217)',
	accentA400: 'rgb(58, 255, 203)',
	accentA700: 'rgb(32, 255, 197)',
	accentContrast50: 'rgb(0, 0, 0)',
	accentContrast100: 'rgb(0, 0, 0)',
	accentContrast200: 'rgb(0, 0, 0)',
	accentContrast300: 'rgb(0, 0, 0)',
	accentContrast400: 'rgb(0, 0, 0)',
	accentContrast500: 'rgb(255, 255, 255)',
	accentContrast600: 'rgb(255, 255, 255)',
	accentContrast700: 'rgb(255, 255, 255)',
	accentContrast800: 'rgb(255, 255, 255)',
	accentContrast900: 'rgb(255, 255, 255)',
	accentContrastA100: 'rgb(0, 0, 0)',
	accentContrastA200: 'rgb(0, 0, 0)',
	accentContrastA400: 'rgb(0, 0, 0)',
	accentContrastA700: 'rgb(0, 0, 0)',
	primaryColor: '#00adc3',
	warningColor: '#f0b432',
	accentColor: '#0c7782',
	secondaryColor: '#666',
	successColor: '#3aad6d',
	accentColor200: '#2185b8',
	redColor: 'rgb(255, 0, 0)',
	accentColor50: '#1c719b',
};

export const DEFAULTS_THEM_OPTIONS = {
	fontFamily: 'Din-Next-Lt-Arabic_Regular',
	favicon: '/assets/favicon.ico',
	...DEFAULTS_COLORS,
	...DEFAULTS_IMAGES,
	...CUSTOM_CSS,
	...DEFAULT_FOOTER,
};

export const DEFAULT_CONFIG = [DEFAULTS_THEM_OPTIONS];
