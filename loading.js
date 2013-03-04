/**
 * Предзагрузка - скачиваем файл
 * затем используем файл из кеша (даже для след. страницы)
 * @param {type} file
 * @returns {undefined}
 */
var preload;
if(/*@cc_on!*/false){
    preload = function(file){
        new Image().src = file;
    };
} else{
    preload = function(file){
        var obj = document.createElement('object'),
            body = document.body;
            
            obj.width = 0;
            obj.height = 0;
            obj.data = file;
            body.appendChild(obj);
    };
}
var require = function(file, clbk){
    var script = document.getElementsByTagName('script')[0],
        newjs = document.createElement(file);
       
    newjs.onreadystatechange = function(){
        if(newjs.readyState === 'loaded' || newjs.readyState === 'complete'){
            newjs.onreadystatechane = null;//?
            clbk();
        }
    };
    newjs.onload = function(){
        clbk();
    };
    newjs.src = file;
    script.parentNode.insertBefore(newjs, script);
};