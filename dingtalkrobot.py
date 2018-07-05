#-*- coding: utf-8 -*-
import requests
import json
import re
import datetime

def get_url_res(url, headers={}, tries=2, timeout=19):
  '''get response of request'''
  times = 0
  res = None
  while(times < tries):
    times +=1
    try:
      res = requests.get(url=url, headers=headers, timeout=timeout)
      break
    except:
      continue

  return res 

def get_weather_info(country, region_name, city):
  base_url = "https://tianqi.moji.com/weather/{}/{}/{}"
  weather_url = base_url.format(country, region_name, city)
  weather_data = r"市今天实况：(?P<weather>\S+\s\S+)，"
  weather_jpg = r"data-url=\"(?P<picture>https:\S+)\""

  res = get_url_res(weather_url)
  if res:
    mobj = re.search(weather_data, res.text.encode('utf-8'))
    weather = mobj.group('weather')
    mobj1 = re.search(weather_jpg, res.text.encode('utf-8'))
    jpg = mobj1.group('picture')
    return weather, jpg

webhook = "https://oapi.dingtalk.com/robot/send?access_token=1a663c12d7a937ca828ae2108c2c22df867d7ff9f03e60be1f31be30a19f7032"

headers = {'Content-Type': 'application/json;charset=UTF-8'}

weather, jpg = get_weather_info("china", "guangdong", "guangzhou")
print (weather, "<====>", jpg)
msg_with_pic = {
    "msgtype" :"markdown",
    "markdown": {
        "title": "Morning, 上班啦~",
        "text": "### Morning, 上班啦~\n > {}\n > ![screenshot]({})\n >  对了别忘记打卡哦 [忍者]".format(weather, jpg), 
    }
}

week = datetime.datetime.today().isoweekday()
if week <= 5: 
    res = requests.post(webhook, headers=headers, data=json.dumps(msg_with_pic)) 
