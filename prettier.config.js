module.exports = {
    parser: "typescript",
    printWidth: 80,
    semi: true,
    tabWidth: 4,
    trailingComma: "all",
    importOrder: [
        "<THIRD_PARTY_MODULES>",
        "^@ORGANIZATION/PROJECT-api(.*)$",
        "^@ORGANIZATION/PROJECT-models(.*)$",
        "(.*)providers/(.*)$",
        "^[./]"
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: [
        "decorators-legacy",
        "typescript",
    ]
};