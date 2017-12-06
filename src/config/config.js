module.exports={
    db : {
        //배포용 mlab 클라우드
        // url: 'mongodb://wooooooak:getover1@ds259305.mlab.com:59305/mazii'

        //개발용 로컬 db
        url:'mongodb://localhost/mazii',
    },
    facebook:{
        clientID:'1463663843752591',
        clientSecret:'afee70a4d04fad6677a2e111e27f4cc4',
        callbackURL:'/auth/facebook/callback'
    }
}