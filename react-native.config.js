/**
 * @type {import('@react-native-community/cli-types').UserDependencyConfig}
 */
module.exports = {
    dependency: {
        platforms: {
            ios: {
                componentDescriptors: ['PasteTextInputComponentDescriptor'],
                components: {
                    'PasteTextInput': {
                        componentName: 'PasteTextInput',
                    },
                },
            },
            android: {
                sourceDir: './android',
                cmakeListsPath: 'generated/jni/CMakeLists.txt',
                componentDescriptors: ['PasteTextInputComponentDescriptor'],
            },
        },
    },
};
