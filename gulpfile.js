const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoPrefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('node-sass'));
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const ghPages = require('gh-pages');
const path = require('path');


const clean = () => {
    return del(['dist'])
}


const resources = () => {
    return src('src/resources/**')
        .pipe(dest('dist'))
}

const font = () => {
    return src('./src/font/**')
        .pipe(dest('dist/font'))
}


const styles = () => {
    return src('./src/styles/styles.scss')
        .pipe(sass().on('error', notify.onError()))
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(concat('main.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('dist/css'))

}
const stylesDev = () => {
    return src('./src/styles/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', notify.onError()))
        .pipe(concat('main.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}



const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))

}
const htmlDev = () => {
    return src('src/**/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}


const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: ('../sprite.svg')
                }
            }
        }))
        .pipe(dest('dist/images'))
}

const scripts = () => {
    return src('src/js/main.js')
        .pipe(webpackStream({
            mode: 'production',
            output: {
                filename: 'app.js',
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }]
            },
        }))
        .on('error', function(err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end'); // Don't stop the rest of the task
        })
        .pipe(uglify({
            toplevel: true
        }).on('error', notify.onError()))
        .pipe(dest('dist/js'))

}
const scriptsDev = () => {
    return src('src/js/main.js')
        .pipe(sourcemaps.init())
        .pipe(webpackStream({
            mode: 'development',
            output: {
                filename: 'app.js',
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }]
            },
        }))
        .on('error', function(err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end'); // Don't stop the rest of the task
        })


    .pipe(sourcemaps.write())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}



const images = () => {
    return src([
            'src/images/**/*.jpg',
            'src/images/**/*.png',
            'src/images/*.svg',
            'src/images/**/*.jpeg',
        ])
        .pipe(imagemin())
        .pipe(dest('dist/images'))
}
const imagesDev = () => {
    return src([
            'src/images/**/*.jpg',
            'src/images/**/*.png',
            'src/images/*.svg',
            'src/images/**/*.jpeg',
        ])
        .pipe(dest('dist/images'))
}


const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}



watch('src/styles/**/*.scss', styles)
watch('src/**/*.html', htmlMinify)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)
    // watch('src/**/*.html', htmlDev)
watch('src/**/*.html', htmlDev).on('change', browserSync.reload);
watch('src/styles/**/*.scss', stylesDev)
watch('src/js/**/*.js', scriptsDev)
watch('src/images', imagesDev)

function deploy(cb) {
    ghPages.publish(path.join(process.cwd(), './dist'), cb);
}

exports.deploy = deploy;
exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.stylesDEV = stylesDev
exports.scriptsDev = scriptsDev
exports.htmlDev = htmlDev
exports.imagesDev = imagesDev

exports.prod = series(clean, htmlMinify, scripts, font, styles, images, svgSprites)
exports.dev = series(clean, resources, htmlDev, scriptsDev, font, stylesDev, imagesDev, svgSprites, watchFiles)