#! /usr/bin/python 
import subprocess
import os 
import re

#ps -ef | grep ssh\ -p\ 22\ -f\ -N | grep -v grep | awk '{print $2}'
try:
    ps = subprocess.Popen(('ps', '-ef'), stdout=subprocess.PIPE)
    grep = subprocess.Popen(('grep', 'ssh\ -p\ 22\ -f\ -N' ), stdin=ps.stdout, stdout=subprocess.PIPE)
    awk = subprocess.check_output(('awk', '{print $2}'), stdin=grep.stdout)
    ps.wait()
    grep.wait()
    print(awk)
except:
    command = "ssh -p 22 -f -N -D 0.0.0.0:1090 nautilis@47.90.206.255"
    os.system(command)
    exit()

pids = [p for p in awk.split('\n') if re.match("^\d", p)]
for pid in pids:
    print("to kill...%s" % (pid))
    subprocess.check_output(["kill", pid])

command = "ssh -p 22 -f -N -D 0.0.0.0:1090 nautilis@47.90.206.255"
os.system(command)
