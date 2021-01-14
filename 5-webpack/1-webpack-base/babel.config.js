const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
            },
            useBuiltIns: "usage",
            "corejs": "3.6.4",
        },
    ],
];

const plugins = [
    [
        "@babel/plugin-transform-runtime",
        {
            absoluteRuntime: false,
            corejs: 3,// 标准库3，需要安装好
            helpers: true,
            regenerator: true,
            useESModules: false,
            version: "7.0.0-beta.0"
        }
    ],
    ["@babel/plugin-proposal-class-properties"]
]
module.exports = { presets, plugins }