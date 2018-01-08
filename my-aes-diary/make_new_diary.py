#!/home/nautilis/local/env_spider/bin/python
#-*- coding: utf-8-*-

import time
import os
import requests
import re

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

# create new diary formated by time 
name = time.strftime('%Y-%m-%d_%H:%M:%S.md',time.localtime(time.time()))
command = 'touch {}'.format(name)
os.system(command)
print "new file: {} had been created".format(name)

# access weather info 
weather_url = "https://tianqi.moji.com/weather/china/guangdong/guangzhou"
weather_data = r"广州市今天实况：(?P<weather>\S+\s\S+)，"

res = get_url_res(weather_url)
if res:
  mobj = re.search(weather_data, res.text.encode('utf-8'))
  weather = mobj.group('weather')
  date = time.strftime('%Y-%m-%d',time.localtime(time.time()))
  print "{}<===>{}".format(date, weather)

  with open(name, 'w')as f:
    string = "__date: __{}\r\n__weather: __{}\r\n".format(date, weather)
    f.write(string)

print "done"

