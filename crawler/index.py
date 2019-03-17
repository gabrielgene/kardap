from flask import Flask
from bs4 import BeautifulSoup
import requests
import json
app = Flask(__name__)

def getRests(uuid, siteUrl):
  urlFull = siteUrl+'/'+uuid
  urlRest = 'https://www.ifood.com.br/delivery/'+urlFull
  req = requests.get(urlRest)
  return req.text

def allRests():
  urlAddress = 'https://webapp.ifood.com.br/api/restaurant/list?filterJson={"city":"SALVADOR","state":"BA","page":1,"restaurantIds":[],"pageSize":1}&responseMode=RESPONSE_MODE_LIST'
  req = requests.post(urlAddress)
  listVar = req.json()['data']['list']

  htmls = []
  for target_list in listVar:
    htmls.append(getRests(target_list['uuid'], target_list['siteUrl']))

  # print(htmls[0])
  soup = BeautifulSoup(htmls[0], 'html.parser')
  print(soup.find_all('script')[4])
  # print(soup.prettify())


  # text = req.text
  # f = open("restaurants.txt","w+")
  # f.write(text.encode('utf-8'))
  # f.close()

  return soup.prettify()
  # return req.text


@app.route('/')
def hello_world():
    return allRests()
