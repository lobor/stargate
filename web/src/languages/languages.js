import LocalizedStrings from './../../../core/react-localization';

let strings = new LocalizedStrings({
  en: require('./ressources/en'),
  fr: require('./ressources/fr')
});
// strings.setLanguage('en');
window.Lang = strings;
