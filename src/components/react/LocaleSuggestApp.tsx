import I18nProvider from './I18nProvider';
import LocaleSuggest from './LocaleSuggest';

type LocaleMeta = {
	code: string;
	name: string;
	nativeName: string;
	region: string;
};

type Props = {
	locale: string;
	locales: LocaleMeta[];
	pageSlugs: Record<string, string>;
	defaultLocale?: string;
};

export default function LocaleSuggestApp(props: Props) {
	return (
		<I18nProvider locale={props.locale}>
			<LocaleSuggest
				currentLocale={props.locale}
				locales={props.locales}
				pageSlugs={props.pageSlugs}
				defaultLocale={props.defaultLocale}
			/>
		</I18nProvider>
	);
}
