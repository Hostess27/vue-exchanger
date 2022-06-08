const path = require("path");
module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            symlinks: false,
            alias: {
                "@": path.resolve(__dirname, "src/"),
                "@vue": path.resolve(__dirname, "src/vue/"),
                "@common": path.resolve(__dirname, "src/vue/common/"),
                "@form": path.resolve(__dirname, "src/vue/form/"),
                "@field": path.resolve(__dirname, "src/vue/field/"),
                "@pages": path.resolve(__dirname, "src/vue/pages/"),
                "@js": path.resolve(__dirname, "src/js/"),
            },
        },
    },
};
