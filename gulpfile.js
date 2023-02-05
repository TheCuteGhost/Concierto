const {src, dest, watch, parallel} = require("gulp"); 

// CSS
const sass = require("gulp-sass")(require("sass"));
const gulp = require('gulp-plumber');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');

function css (end) {

    src('../src/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest("build/css")) //Pipe es para que se haga una fucion dentro de los parentecis. Podemos añadir más pipe para que se vuelva a repetir

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
        .pipe(webp(opciones))
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

function dev (end) {
    watch("src/scss/**/*.scss", css);

    end();
}

exports.css = css;  
exports.Webp = Webp;
exports.Avif = Avif;
exports.imagenes = imagenes;
exports.dev = parallel(Avif,imagenes, Webp, dev); 

