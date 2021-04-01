const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// exports.onCreateWebpackConfig = ({ actions, stage }) => {
//     if (stage === 'build-javascript') {
//         actions.setWebpackConfig({
//             devtool: false,
//             optimization: {
//                 minimizer: [new UglifyJsPlugin()],
//             },
//         })
//     }
// }

exports.onCreateNode = ({ node }) => {
    console.log(`Node created of type "${node.internal.type}"`)
}
