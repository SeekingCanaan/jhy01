const express = require('express')
const bcrypt = require('bcrypt')
const Core = require('@alicloud/pop-core')
const jwt = require('jsonwebtoken')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const SECRET = "jhyJHYjhy"
var CODE = ''
const app = express()

//允许跨域
app.use(require('cors')())
app.use(express.json())
app.use(cookieParser());
app.use(expressSession({
    secret: '12345',
    name: 'testapp',
    cookie: {maxAge: 80000},
    resave: false,
    saveUninitialized: true
}));
//数据库部分
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/jhy', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const Article = mongoose.model('Article', new mongoose.Schema({
    title: {type: String},
    body: {type: String}
}))
const elUser = mongoose.model('elUser', new mongoose.Schema({
    name: {type: String, unique: true},
    password: {type: String,
    set(val) {
        return bcrypt.hashSync(val, 7)
    }},
    sex: {type: String},
    email: {type: String},
    phone: {type: String},
    phoneCode: {type: String, default: ''}
}, {versionKey: false}))

app.get('/', async (req, res) => {
    res.send('index');
})

//新增文章
app.post('/api/article',async (req, res)=> {
    const article = await Article.create(req.body);
    res.send(article);
})

//查看文章
app.get('/api/articles', async (req, res)=> {
    console.log('用户名 ' + req.session.name)
    console.log('密码 ' + req.session.password)
    const articles = await Article.find()
    res.send(articles);
})

//删除文章
app.delete("/api/articles/:id", async (req, res)=> {
    console.log(req.headers)
    await Article.findByIdAndDelete(req.params.id)
    res.send({status: true})
})

//文章详情
app.get(`/api/articles/:id`, async (req, res) => {
    const articles = await Article.findById(req.params.id)
    res.send(articles)
})

//文章修改
app.put(`/api/articles/:id`, async (req, res) => {
    const articles = await Article.findByIdAndUpdate(req.params.id, req.body)
    res.send(articles)
})

//用户注册
app.post('/api/register',  (req, res)=> {
    let name = req.body.name;
    elUser.findOne({"name": name}, (err, data)=> {
        if(data) {
            res.send({code: 0})
        } else {
            elUser.create({
                name: req.body.name,
                password: req.body.password,
                sex: req.body.sex,
                email: req.body.email,
                phone: req.body.phone
            });
            res.send({code: 1})
        }
    })
})

//用户登录
app.post('/api/login', async (req, res) => {
    const user = await elUser.findOne({
        name: req.body.name
    })
    if (!user) {
        return res.send({code: 0});
    }
    const isPasswordValid = require('bcrypt').compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
        console.log("密码无效")
        return res.send({code: 0});
    }
    const token = jwt.sign({
        id: String(user._id)
    }, SECRET)
    req.session.name = req.body.name;
    req.session.password = req.body.password;
    res.send({code: 1, user, token})

})

//获取手机验证码
app.post('/api/code',   async (req, res)=> {
    console.log('获取验证码的手机号: ' + req.body.phone);
    const user = await elUser.findOne({phone: req.body.phone});
    if (!user) {
        return res.send({code: 0, msg: '该用户不存在'})
    }
    CODE = phoneCode(req.body.phone);
    const findUser = await elUser.findOneAndUpdate({_id: user._id}, { phoneCode: CODE}, {new: true})
    if (findUser) {
        res.send({code: 1, msg: '验证码已发送'})
        console.log(findUser)
    } else {
        res.send({code: 0, msg: '验证码发送失败'})
    }
})

//手机登录
app.post('/api/loginPhone', async (req, res) => {
    let {phone, code} = req.body;
    const user = await elUser.findOne({phone: phone})
    if (!user) {
        return res.send({code: 0, msg: '手机号不存在'})
    }
    console.log('code ' + req.session.code)
    console.log('phone ' + req.session.phone)
    // console.log('user.phoneCode ' + user.phoneCode)
    // console.log('code ' + code)
    if (req.session.code === code && req.session.phone === phone) {
        res.send({code: 1, msg: '登录成功'})
    } else {
        res.send({code: 0, msg: '验证码错误'})
    }
})
app.listen(3001, ()=> {
    console.log("http://localhost:3001/")
})


function phoneCode (PhoneNumbers) {
    let arr = ""
    for (let i = 0; i < 6; i++) {
        let a = parseInt(10 * Math.random());
        arr += a.toString()
    }

    var client = new Core({
        accessKeyId: 'LTAI4G5T5UuDQMeRhQE3okQR',
        accessKeySecret: 'Wr12hqiq9QtVQ65faNMtHayGiGEEaH',
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
    });
    console.log('验证码为: ' + arr)

    let params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": PhoneNumbers,
        "SignName": "JOJO餐饮",
        "TemplateCode": "SMS_204275229",
        "TemplateParam": `{\"code\":\"${arr}\"}`
    }

    let requestOption = {
        method: 'POST'
    };

    client.request('SendSms', params, requestOption).then((result) => {
        console.log(JSON.stringify(result));
    }, (ex) => {
        console.log(ex);
    })
    return arr;
}

