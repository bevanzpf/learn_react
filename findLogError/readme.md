##### 远程日志监控脚本
> 基本原理: config.json 配置所有服务器的ip和日志文件的位置。finder.py 定时访问服务器tail出新增的行数，从新增行数匹配出错误信息，整理信息发送到钉钉群。
