#! /usr/bin/python 
import subprocess
import os 
import re

#ps -ef | grep ssh\ -p\ 22\ -f\ -N | grep -v grep | awk '{print $2}'
ps = subprocess.Popen(('ps','-ef'), stdout=subprocess.PIPE)
process = subprocess.check_output(("grep", "ssh\ -p\ 22\ -f\ -N" ), stdin=ps.stdout);
ps.wait()
print(process)
processes = process.split("\n")
for process in processes:
    match_obj = re.search("nautilis\ *(\d*)", process)
    if match_obj != None:
        print("matched...", match_obj.group(1))
        pid = match_obj.group(1) 
        subprocess.check_output(["kill", pid])   

command = "ssh -p 22 -f -N -D 0.0.0.0:1090 nautilis@47.90.206.255"
os.system(command)
