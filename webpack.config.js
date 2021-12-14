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
    .addEntry('globalsjs', './assets/global/globals.js')
    .addStyleEntry('globals', './assets/global/globals.scss')
    .addEntry('flatpikr', './assets/global/flatpikr.js')

    // wysiwyg
    .addEntry('fancyboxjs', './assets/global/fancybox.js')
    .addStyleEntry('fancybox', './assets/global/fancybox.scss')

    // fancybox
    .addEntry('wysiwyg-js', './assets/global/wysiwyg.js')

    // Custom
    .addEntry('mainjs', './assets/front/main.js')
    .addStyleEntry('main', './assets/front/main.scss')

    // Map
    .addEntry('map-multiple-js', './assets/front/map-multiple.js')
    .addEntry('map-single-js', './assets/front/map-single.js')
    .addStyleEntry('map', './assets/front/map.scss')

    // Picture
    .addEntry('picture-js', './assets/front/picture.js')
    .addStyleEntry('picture', './assets/front/picture.scss')
    .addStyleEntry('grid', './assets/front/grid.scss')

    // Admin
    .addEntry('adminjs', './assets/admin/admin.js')
    .addStyleEntry('admin', './assets/admin/admin.scss')

    // Admin filepond
    .addEntry('filepondjs', './assets/admin/filepond.js')
    .addEntry('filepond-dynamique-catalogjs', './assets/admin/filepond-dynamique-catalog.js')
    .addStyleEntry('filepond', './assets/admin/filepond.scss')

    // Admin place map
    .addEntry('place-map-formjs', './assets/admin/place/map-form.js')
    .addEntry('place-map-form', './assets/admin/place/map-form.scss')

    // Admin tree
    .addEntry('admin-tree-js', './assets/admin/catalog/tree.js')
    .addStyleEntry('admin-tree', './assets/admin/catalog/tree.scss')

    // Admin pictues mass edit
    .addEntry('pictues-mass-edit-js', './assets/admin/catalog/pictues-mass-edit.js')
    .addStyleEntry('pictues-mass-edit', './assets/admin/catalog/pictues-mass-edit.scss')

    .addEntry('pictues-duplicate-remover-js', './assets/admin/catalog/pictues-duplicate-remover.js')

    // Admin Datatable
    .addEntry('admin-catalog-datatable-js', './assets/admin/catalog/catalog-datatable.js')
    .addStyleEntry('admin-catalog-datatable', './assets/admin/catalog/catalog-datatable.scss')

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
