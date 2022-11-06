const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //Чистит dist от неактуальных файлов
const CopyWebpackPlugin = require('copy-webpack-plugin'); //Копирует файлы
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development'; //js идет к системной переменной чтобы узнать в каком режиме мы работаем
const isProd = !isDev;

console.log(`Webpack started in ${isDev ? 'DEVELOPMENT mode' : 'PRODUCTION mode'}`);

const optimization = () => {
    const config = {
        splitChunks: {
            //Если мы подключаем одну и ту же библиотеку в файлы, создает отдельный файл с этой библиотекой, который импортится в нужные файлы. Иначе добавляет код библиотеки в сам файл, что сказывается на оптимизации.
            chunks: 'all',
        },
    };

    if (isProd) {
        //Когда в продакшене, используем сжатие кода
        config.minimize = true;
        config.minimizer = [new TerserWebpackPlugin()];
    }

    return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`); //В разработке имя файла без хэша, с продакшн с хэшем

module.exports = {
    context: path.resolve(__dirname, './src'), //Где лежат все исходники нашего приложения. Далее webpack уже будет отталкиваться от данной папки (в entry.main и т.д.)
    mode: isDev ? 'development' : 'production', //В каком режиме вебпак будет компилировать файлы
    entry: path.resolve(__dirname, './src/index.ts'), //Входной файл в приложение. Это основной файл, в который подключаются остальные модули.
    output: {
        //Куда складывается результат работы Вебпака. По умолчанию это папка dist.
        filename: filename('js'), // [name], [contenthash] - паттерны. name берет название из entry (т.е., будет делать main.bundle.js и analytics.bundle.js). contenthash генерирует хэш по контенту файла (чтобы при обновлении скрипта у пользователя загружался новый файл, а не сохраненный в кэше файл с таким же названием)
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'], //Если в импорте не пишем расширения, то по умолчанию ищи такие.
        alias: {
            // '@': path.resolve(__dirname, 'src'), //Как бы миксин пути. Полезно если один и тот же путь приходится часто прописывать.
			handlebars: 'handlebars/dist/handlebars.min.js'
        },
    },
    optimization: optimization(),
    devServer: {
        port: '8000',
        open: true,
        hot: true,
        https: true,
        liveReload: true,
		static: './dist',
		historyApiFallback: true,
		open: process.env.WEBPACK_SERVER_BROWSER || 'Yandex' || true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './static'),
                    to: path.resolve(__dirname, './dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ],
    module: {
        //Для того, чтобы трансформировать файл, используются специальные утилиты - загрузчики (loaders).
        //Для настроек таких загрузчиков используется module.
        //Массив rules внутри объекта module определяет список правил для загрузчиков.
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
        ],
    },
};
