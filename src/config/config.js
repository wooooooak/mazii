module.exports={
    db : {
        //배포용 mlab 클라우드
        // url: 'mongodb://wooooooak:getover1@ds259305.mlab.com:59305/mazii'

        //개발용 로컬 db
        url:'mongodb://localhost/mazii',
    },
    facebook:{
        clientID:'527791144236225',
        clientSecret:'5652eb54204dcaa58e6a9baa5c06d1d8',
        callbackURL:'/auth/facebook/callback'
    }
}