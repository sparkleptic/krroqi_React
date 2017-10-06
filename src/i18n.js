import { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';

/*
    We are very likely not to have all the languages translated,
    so fallback to default locale in case we don't
 */
I18n.fallbacks = true;

I18n.translations = {
    en,
    ar
};

I18n.defaultLocale = 'en';
I18n.locale = I18nManager.isRTL ? 'ar' : 'en';

/*
    Only allow RTL if we have translations for RTL languages (ie. not fallbacks)
*/
I18nManager.allowRTL(true);
I18nManager.forceRTL(false);

/*
    Set start/end for developer use in non-RTL aware cases,
    for example, when using 'react-native-navigation':

        this.props.navigator.toggleDrawer({
            side: I18n.start, //instead of hardcoing left/right
            animated: true
        });
 */
I18n.start = I18nManager.isRTL ? 'right' : 'left';
I18n.end = I18nManager.isRTL ? 'left' : 'right';

export default I18n;