/**
 * @type {import('@react-native-community/cli-types').UserDependencyConfig}
 */
module.exports = {
    dependency: {
        platforms: {
            ios: {
                sourceDir: './ios',
                componentDescriptors: ['PasteTextInputComponentDescriptor'],
                libraryName: 'PasteTextInputSpecs',
            },
            android: {
                sourceDir: './android',
            },
        },
    },
};
