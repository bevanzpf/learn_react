#! -*- coding: utf-8 -*-
import requests
from lxml import etree

def getPosition(train_num):
    res = requests.get("http://search.huochepiao.com/checi/{}".format(train_num))
    positions = []    
    tree = etree.HTML(res.content)
    for i in range(2, 10):
        link = u"//table[3]/tr/td/center/table[2]/tr[{}]/td[3]/a".format(i)
        print(link)
        node = tree.xpath(link) 
        if len(node) >=1:
            print(node[0])
            positions.append(node[0].text)
        else:
            break;

    return positions

if __name__ == '__main__':
    #positions = getPosition("G6317")
    #print(positions)

    to_cs = "G6317,D7525,G6301,G6305,D7501,G6325,D7537,D7513,D7533,D2381,G6337,G6321,G6313,D7509,G1607,G6309,D7517,D7505,G6329,D7529,D933,D7521,G6345,G6341,G6317,D7501,G6325,D7533,D2381,G6313,G1607,D7517,G6329,D7529"

    trains = to_cs.split(",")
    pst_nums = {}
    csv = ""
    for train in trains:
        print(train)
        positions = getPosition(train)
        print(positions)
        csv += train
        csv += ",".join(item for item in positions if item) 
        csv += "\n"

        for item in positions:
            if not item:
                continue
            if not pst_nums.get(item,False):
                print("#=====? " + item)
                _list = []
                _list.append(train)
                pst_nums[item] = _list 
            else:
                pst_nums[item].append(train)
        

    with open("train.csv", "w") as f:
        f.write(csv)

    txt = ""
    for p, t in pst_nums.items():
        txt += p
        txt += "|||"
        txt += ",".join(t)
        txt += "\n"

    with open("position_num.txt", "w") as f:
        f.write(txt)
    
# 
