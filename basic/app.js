const express = require("express")
var { engine } = require('express-handlebars');
const app = express()
const port = 3000

//커스텀헬퍼 (ex. 문자열 비교는 내장된 헬퍼로 구현 불가능 , 커스텀 헬퍼 사용)
app.engine(".hbs", engine({
    extname:".hbs",
    helpers : {
        ifUsernameParkoon : function (arg1,arg2,options) {
            //fn은 커스텀 헬퍼가 감싸고 있는 부분을 출력
            //inverse는 출력하지 않는 역할
            return arg1 === arg2 ? options.fn() : options.inverse();
        },
        helpersTest : function(arg1,options) {
            return "helper test"
        }
    }
})) 
app.set('view engine', ".hbs");
app.get('/',(req,res) => {
res.status(200).render("home",{
    name : "parkoon",
    isLoggedIn : true,
    isReady : false,
    users : ["parkoon","kimyang","choikoon","leeyang"]
});
})

app.listen(port,()=>{
console.log(`port ${port}`)
})
