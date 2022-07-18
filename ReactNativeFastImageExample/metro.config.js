/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path")
const extraNodeModules = {
    'react-native-fast-image': path.resolve(__dirname, '..'),
}
console.warn({extraNodeModules})

module.exports = {
    resolver: {
        // https://dushyant37.medium.com/how-to-import-files-from-outside-of-root-directory-with-react-native-metro-bundler-18207a348427
        extraNodeModules: new Proxy(extraNodeModules, {
            get: (target, name) =>
            //redirects dependencies referenced from extraNodeModules/ to local node_modules
            name in target
                ? target[name]
                : path.join(process.cwd(), `node_modules/${name}`),
        }),
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
}
