#!/home/nautilis/local/env_spider/bin/python
#-*- coding: utf-8 -*-
from Crypto.Cipher import AES
import sys
import os
import base64
import logging

logging.basicConfig(level=logging.DEBUG,
                format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                datefmt='%a, %d %b %Y %H:%M:%S',
                filename='/home/nautilis/workplace/py/myaes/myaes.log',
                filemode='w')

class MyEncode():

  PADDING = '\0'
  pad_it = lambda self, s: s+(16 - len(s)%16)*self.PADDING  
  key = ''
  iv = ''
  source = ""
  crypted_str = ""

  def __init__(self, key, iv, source="", crypted_str=""):
    self.source = source
    self.crypted_str = crypted_str 
    self.key = key
    self.iv = iv


  def encode(self):
    generator = AES.new(self.key, AES.MODE_CBC, self.iv)
    crypt = generator.encrypt(self.pad_it(self.source))   
    crypted_str = base64.b64encode(crypt)
    return crypted_str

  def decode(self):
    crypt = base64.b64decode(self.crypted_str)
    generator = AES.new(self.key, AES.MODE_CBC, self.iv)
    recovery = generator.decrypt(crypt)
    return recovery.rstrip(self.PADDING)

is_encode = int(sys.argv[1]) #
is_file = 0
if is_encode: 
  path = raw_input("please input to encode:")
  _type = "encrypted" 

  if not os.path.isfile(path):
    source = path

  else:
    is_file = 1 
    logging.debug('opening file %s' % path)
    with open(path, 'r') as f:
      lines = f.readlines() 
    source = "".join(lines)

  key = raw_input("please input key:") 

  if len(key) != 16:
    print "key must be 16 characters"
    exit() 

  vi = key
  myencode = MyEncode(key, vi, source=source)
  result = myencode.encode()

else:
  _type = "decrypted"
  path = raw_input('please input to decode:')

  if not os.path.isfile(path):
    crypted_str = path 

  else:
    is_file = 1
    with open(path, 'r') as f:
      lines = f.readlines()
    crypted_str = "".join(lines)

  key = raw_input('please input your key:') 
  if len(key) != 16:
    print 'key must be 16 characters'
    exit()

  vi = key
  myencode = MyEncode(key, vi, crypted_str=crypted_str)
  result = myencode.decode()

if is_file:
  basefile = os.path.basename(path)
  result_file = basefile.split('.')[0] + "."+  _type
  if os.path.isfile(result_file):
    print "%s is existed, make sure again"
    exit()

  with open(result_file, 'w')as f:
    f.write(result)
  if _type == "encrypted":
    command = "chmod 444 {}".format(result_file)
    os.system(command)
else:
  print result
