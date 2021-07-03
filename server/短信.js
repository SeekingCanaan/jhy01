const Core = require('@alicloud/pop-core');

var arr = ""
for (let i = 0; i < 6; i++) {
    let a = parseInt(10 * Math.random());
    arr += a.toString()
}

var client = new Core({
    accessKeyId: '你的accessKeyId',
    accessKeySecret: '你的accessKeySecret',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});
console.log(arr)

var params = {
    "RegionId": "cn-hangzhou",
    "PhoneNumbers": "15838525323",
    "SignName": "MEET饭店",
    "TemplateCode": "SMS_204106478",
    "TemplateParam": `{\"code\":\"${arr}\"}`
}

var requestOption = {
    method: 'POST'
};

client.request('SendSms', params, requestOption).then((result) => {
    console.log(JSON.stringify(result));
}, (ex) => {
    console.log(ex);
})
