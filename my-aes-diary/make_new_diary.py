#!/home/nautilis/local/env_spider/bin/python
#-*- coding: utf-8-*-

import time
import os
import requests
import re
import json

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

def get_location_info():
  '''get location by ip'''
  ip_api = "http://ip-api.com/json/?lang=en"
  api_res = get_url_res(ip_api)
  if api_res:
    jobj = api_res.json()
    country = jobj['country'].encode('utf-8')
    region_name = jobj['regionName'].encode('utf-8')
    city = jobj['city'].encode('utf-8')
    return country, region_name, city 

  return (None for i in range(3)) 


def get_weather_info(country, region_name, city):
  base_url = "https://tianqi.moji.com/weather/{}/{}/{}"
  weather_url = base_url.format(country, region_name, city)
  weather_data = r"市今天实况：(?P<weather>\S+\s\S+)，"

  res = get_url_res(weather_url)
  if res:
    mobj = re.search(weather_data, res.text.encode('utf-8'))
    weather = mobj.group('weather')
    return weather

# create new diary formated by time 
local = time.localtime(time.time())
date = time.strftime('%Y-%m-%d',local)
week = time.strftime('%a', local)
name = time.strftime('%Y-%m-%d_%H:%M:%S.md',local)
command = 'touch {}'.format(name)
os.system(command)
print "new file: {} had been created".format(name)

# access weather info 
country, origion_name, city = get_location_info()
if not (country and origion_name and city):
  print 'fail to get location info'
  exit()

weather = get_weather_info(country.lower(), origion_name.lower(), city.lower()) 

if weather:
  print "{}<===>{}<===>{}·{}<===>{}".format(date, week, origion_name, city, weather)

  with open(name, 'w')as f:
    string =("__date:__ {}  \r\n" \
     + "__week:__ {}  \r\n" \
     + "__weather:__ {}  \r\n" \
     + "__location:__ {}  \r\n" \
    ).format(date, week, weather, city)
    f.write(string)

else:
  print 'failed to get weather info'
  exit()

print "done"

