#!/usr/local/python
#-*-coding: UTF-8 -*-
import json
import os
import subprocess
import re
import requests

error_pattern = r"\d{4}-\d{2}-\d{2}\ \d{2}:\d{2}:\d{2}\.\d+\ ERROR[\s\S]+?\d{4}-\d{2}-\d{2}\ \d{2}:\d{2}:\d{2}"
config_file = "%s/config.json" % os.path.dirname(os.path.abspath(__file__))
webhook = "https://oapi.dingtalk.com/robot/send?access_token=1a663c12d7a937ca828ae2108c2c22df867d7ff9f03e60be1f31be30a19f7032"
headers = {'Content-Type': 'application/json;charset=UTF-8'}

def get_config(file):
    with open(file, 'r') as f:
        line = f.read()
    return json.loads(line)

def get_file_errors(target_file, line2tail, pattern, ip=None):
    log_content = subprocess.check_output(["ssh", ip, "tail", "-n", "%s" % line2tail, target_file])
    errors = re.findall(pattern, log_content, re.MULTILINE)  # TODO 如果没有
    return errors 

# 渲染模板信息
def get_dingtalk_msg(res_list):
    msg = []
    for res in res_list:
        message = {}
        message["msgtype"] = "markdown"
        markdown = {}
        title = "%s contains %d errors" % (res["project"], res["errorsCount"])
        markdown["title"] ="%s contains %d errors" % (res["project"], res["errorsCount"])
        text = "##### %s  \n\n" % title
        count = 1
        for error in res["errors"]:
            text += "%d. %s\n" % (count, error) 
            count +=1
        markdown["text"] = text
        message["markdown"] = markdown
        msg.append(message)
    return msg

# 消息发送方法
def send_msg(messages):
    for msg in messages:
        res = requests.post(webhook, headers=headers, data=json.dumps(msg))
        print res.content

# 主方法
if __name__ == '__main__':
    config = get_config(config_file)
    tasks = config.get('tasks')
    res_list = []
    for task in tasks:
        target_file = task["path"] 
        target_name = task["project"]
        line_last = task['lineCount']
        ip = task['ip']

        line_now = int(subprocess.check_output(["ssh", ip, "sed", "-n", "$=", target_file]).replace("\n","")) 
        line2tail = line_now - line_last
        errors = get_file_errors(target_file, line2tail+100, error_pattern, ip)

        task['lineCount'] = line_now
        print (target_name, "<===tail===>", line2tail, "<==have==>", len(errors), "error(s)")
        res = {}
        res["project"] = target_name
        res["errors"] = errors
        res["lineIncre"] = line2tail
        res["errorsCount"] = len(errors)
        res_list.append(res)

    conf_str = json.dumps(config)
    with open(config_file, 'w') as f: #更新行数
        f.write(conf_str)

    messages = get_dingtalk_msg(res_list)
    send_msg(messages)
