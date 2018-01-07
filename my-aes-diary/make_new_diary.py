#!/home/nautilis/local/env_spider/bin/python
#-*- coding: utf-8-*-

import time
import os

name = time.strftime('%Y-%m-%d_%H:%M:%S.md',time.localtime(time.time()))
command = 'touch {}'.format(name)
os.system(command)
