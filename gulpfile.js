const {src, dest, watch, parallel} = require("gulp"); 

// CSS
const plumber = require('gulp-plumber');
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps =require('gulp-sourcemaps')

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');

function css (end) {

    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')) //Pipe es para que se haga una fucion dentro de los parentecis. Podemos añadir más pipe para que se vuelva a repetir

    end(); //Callback que le avisa a gulp cuando acaba la función
}

function imagenes(end) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    end();
}

function Avif(end) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    end();
}

function Webp(end) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    end();
}
function js (end) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'))
    end();
}


function dev (end) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", js);

    end();
}


exports.css = css;  
exports.js = js;  
exports.Webp = Webp;
exports.Avif = Avif;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, Webp, Avif, js, dev); 

