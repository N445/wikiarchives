const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .enableStimulusBridge('./assets/controllers.json')

    // Globals
    .addEntry('globalsjs', './assets/globals.js')
    .addStyleEntry('globals', './assets/scss/globals.scss')

    // Admin
    .addEntry('adminjs', './assets/admin.js')
    .addStyleEntry('admin', './assets/scss/admin.scss')

    // Custom
    .addEntry('mainjs', './assets/main.js')
    .addStyleEntry('main', './assets/scss/main.scss')

    // Admin tree
    .addEntry('admin-tree-js', './assets/admin/catalog/tree.js')
    .addStyleEntry('admin-tree', './assets/admin/catalog/tree.scss')

    // Datatable
    .addEntry('admin-catalog-datatable-js', './assets/admin/catalog/catalog-datatable.js')
    .addStyleEntry('admin-catalog-datatable', './assets/admin/catalog/catalog-datatable.scss')

    // Map
    .addEntry('map-multiple-js', './assets/map-multiple.js')
    .addEntry('map-single-js', './assets/map-single.js')
    .addStyleEntry('map', './assets/scss/map.scss')

    // wysiwyg
    .addEntry('wysiwyg-js', './assets/wysiwyg.js')

    // Picture
    .addEntry('picture-js', './assets/picture.js')
    .addStyleEntry('picture', './assets/scss/picture.scss')

    .copyFiles({
        from: 'node_modules/tinymce/skins',
        to: 'skins/[path]/[name].[ext]'
    })

    .copyFiles({
        from: 'node_modules/tinymce/skins',
        to: 'skins/[path]/[name].[ext]'
    })


    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    // .enableStimulusBridge('./assets/controllers.json')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use React
    //.enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    .enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    .autoProvidejQuery()
    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
    })
;

module.exports = Encore.getWebpackConfig();
