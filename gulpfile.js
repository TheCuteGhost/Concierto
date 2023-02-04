const {src, dest, watch} = require("gulp"); 
const sass = require("gulp-sass")(require("sass"));
const gulp = require('gulp-plumber');

function css (end) {

    src('./src/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest("build/css")) //Pipe es para que se haga una fucion dentro de los parentecis. Podemos añadir más pipe para que se vuelva a repetir

    end(); //Callback que le avisa a gulp cuando acaba la función
}

function dev (end) {
    watch("src/**/*.scss", css);

    end();
}

exports.css = css;  
exports.dev = dev; 