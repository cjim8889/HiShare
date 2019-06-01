# HiShare
HiShare, Anyone can share

[![](https://img.shields.io/badge/version-0.0.4-blue.svg)]()
[![Netlify Status](https://api.netlify.com/api/v1/badges/88d7032b-d5e1-4d85-a2c2-fe778687ac0d/deploy-status)](https://app.netlify.com/sites/laughing-turing-d49777/deploys)
[![Backend Build Status](https://dev.azure.com/oxifus/wuhaochen/_apis/build/status/cjim8889.HiShare?branchName=master)](https://dev.azure.com/oxifus/wuhaochen/_build/latest?definitionId=5&branchName=master)

# 简介
这是一个完全匿名的平台，你可以在上面发表文章和评论。每篇文章都有一个唯一的Token，只有有这个Token的人才能访问此文章与评论。

# TODO
* 完善Editor功能
* 完善Build Process
* 改进交互逻辑
* i18n
* 帖子Collections功能
* Code Cleanup

# Build Process
至少需要两个ENV

前后端Build分离

## 后端Build
ENV
* Recaptcha_SecretKey Recaptcha的Secretkey
```bash
docker-compose build
```

## 前端Build
```
cd client-app
REACT_APP_RECAPTCHA_SITEKEY=你的Key npm run build
```



# Known Issues
* <s>编辑器图片功能UI bug</s>
