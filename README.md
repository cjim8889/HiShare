# HiShare
HiShare, Anyone can share

[![Netlify Status](https://api.netlify.com/api/v1/badges/88d7032b-d5e1-4d85-a2c2-fe778687ac0d/deploy-status)](https://app.netlify.com/sites/laughing-turing-d49777/deploys)

# 简介
这是一个完全匿名的平台，你可以在上面发表文章和评论。每篇文章都有一个唯一的Token，只有有这个Token的人才能访问此文章与评论。

# TODO
* 完善Editor功能
* 完善Build Process
* 改进交互逻辑

# Build Process
至少需要两个ENV

* REACT_APP_RECAPTCHA_SITEKEY Recaptcha的Sitekey
* Recaptcha_SecretKey Recaptcha的Secretkey

docker-compose文件默认启动两个container 一个服务端和一个MongoDb
