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

  soup = BeautifulSoup(htmls[0], 'html.parser')
  scriptTagContent = soup.find_all('script')[4].text
  jsonString = scriptTagContent.split('=')[1].replace(';__NEXT_LOADED_PAGES__','')
  finalJson = json.loads(jsonString)

  testando = finalJson['props']['initialState']['restaurant']['menu'][0]['itens'][0]['choices'][1]['garnishItens']

  for target in testando:
    print(target['description'])
    print(target['details'])
    print(target['unitPrice'])

  # print(finalJson['props']['initialState']['restaurant']['menu'][0]['itens'][0]['choices'][1]['garnishItens'])
  # text = req.text
  # f = open("restaurants.txt","w+")
  # f.write(text.encode('utf-8'))
  # f.close()
  return scriptTagContent.split('=')[1]
  # return soup.prettify()
  # return req.text


@app.route('/')
def hello_world():
    return allRests()
