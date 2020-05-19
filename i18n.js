const NextI18Next = require('next-i18next/dist/commonjs').default;

module.exports = new NextI18Next({
    //lng: 'kr',
    defaultLanguage: 'kr',
    otherLanguages: ['kr','en'],
    localeSubpaths: {
        kr: 'kr',
        en: 'en',
    },
    browserLanguageDetection: false,
    serverLanguageDetection: false
});