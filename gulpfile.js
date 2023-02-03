const {src, dest, watch} = require("gulp"); 
const sass = require("gulp-sass")(require("sass"));

function css (done) {

    src('./src/scss/app.scss')
        .pipe(sass())
        .pipe(dest("build/css")) //Pipe es para que se haga una fucion dentro de los parentecis. Podemos añadir más pipe para que se vuelva a repetir

    done(); //Callback que le avisa a gulp cuando acaba la función
}

function dev (done) {
    watch("src/scss/app.scss", css);

    done();
}

exports.css = css;  
exports.dev = dev; 