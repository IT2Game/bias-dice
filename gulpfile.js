const fs = require('fs');
const readline = require('readline');

const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const nodemon = require('gulp-nodemon');

gulp.task('build', function(cb){
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
});

gulp.task('config', function(cb){
    var config ={
        bot:{
            token: "",
        },
        logger:{
            level: 'info'
        }
    }
    var rl = readline.createInterface(process.stdin, process.stdout);
    var pBotToken = new Promise(function(resolve, reject){
        rl.question('Discord Bot Token: ', function(answer){
            config.bot.token = answer;
            resolve();
        });
    });
    pBotToken.then(()=>{
        rl.close();
        fs.writeFileSync('config.json', JSON.stringify(config, null, 4));
        cb();
    });
});
gulp.watch('*.ts', gulp.task('build'))
gulp.task('run', function(cb){
    nodemon({
        script: 'dist/app.js',
    })
})

exports.default = gulp.series(gulp.task('build'), gulp.task('run'));