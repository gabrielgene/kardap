from flask import Flask
from bs4 import BeautifulSoup
import requests
import re
import json
app = Flask(__name__)

def getRests(uuid, siteUrl):
  urlFull = siteUrl+'/'+uuid
  urlRest = 'https://www.ifood.com.br/delivery/'+urlFull
  req = requests.get(urlRest)
  return req.text

def mountDict(dictHtml):
  #Soup
  soup = BeautifulSoup(dictHtml['html'], 'html.parser')


  for index, script_tag in enumerate(soup.find_all('script')):
    result = re.search('__NEXT_LOADED_PAGES__', script_tag.text)
    if result:
      scriptTagContent = soup.find_all('script')[index].text

  jsonString = scriptTagContent.split('=')[1].replace(';__NEXT_LOADED_PAGES__','')
  finalJson = json.loads(jsonString)

  #Get products
  menu = finalJson['props']['initialState']['restaurant']['menu']

  menuItens = menu[0]['itens']

  #Get all menu products
  allItems = []
  for targetItem in menuItens:
    itemChoices = targetItem['choices']  if 'choices' in targetItem else ''
    itemDescription = targetItem['description']

  for target in itemChoices:
    for item in target['garnishItens']:
      details = item['description'].encode('utf-8', 'ignore') if item['description'] else ''
      newDict = {
        'name': item['description'].encode('utf-8', 'ignore'),
        'details': details,
        'price': item['unitPrice'],
      }
      allItems.append(newDict)

  finalRestaurant = {
    'restaurant': dictHtml['restaurant'],
    'dishes': allItems
  }

  return finalRestaurant

def allRests():
  urlAddress = 'https://webapp.ifood.com.br/api/restaurant/list?filterJson={"city":"SALVADOR","state":"BA","page":1,"restaurantIds":[],"pageSize":50}&responseMode=RESPONSE_MODE_LIST'
  req = requests.post(urlAddress)
  listVar = req.json()['data']['list']

  htmls = []
  for target_list in listVar:
    restaurant = target_list['name'].encode('utf-8', 'ignore')
    restaurantDescription = target_list['shortDescription'].encode('utf-8', 'ignore') if 'shortDescription' in target_list else ''
    tipo = target_list['mainFoodType']['name'].encode('utf-8', 'ignore')
    htmls.append({
      'restaurant': restaurant,
      'tipo': tipo,
      'restaurantDescription': restaurantDescription,
      'html':getRests(target_list['uuid'], target_list['siteUrl'])
    })

  restaurants = []
  for html in htmls:
    restaurants.append(mountDict(html))

  print(restaurants)

  return 'run'


@app.route('/')
def hello_world():
    return allRests()
