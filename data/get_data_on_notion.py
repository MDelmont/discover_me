from datas import data

token = data['token']
url_page = data['url_page']
databaseIDScénario = data['databaseIDScénario']

import requests, json

headers = {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json",
    "Notion-Version": "2022-02-22"
}

def responseDatabase(databaseID,headers):
    readUrl=f"https://api.notion.com/v1/databases/{databaseID}"
    res=requests.request("GET",readUrl,headers=headers)
    print(res.status_code)

def readDatabase(databaseID, headers):
    readUrl = f"https://api.notion.com/v1/databases/{databaseID}/query"
    res = requests.request("POST", readUrl, headers=headers)
    data = res.json()
    print(res.status_code)

    with open('./full-properties.json', 'w', encoding='utf8') as f:
        json.dump(data, f, ensure_ascii=False)
    return data

data = readDatabase(databaseIDScénario,headers)
with open('datas.json', "w") as fichier:
    json.dump(data, fichier)

def make_format_dialog(character,backgroud,expression,name,choices,message,voice,order):

    return {
        'order': order,
        'character': character,
        'name': name,
        'expression': expression,
        'message': message,
        'voice': voice,
        'backgroud': backgroud,
        'choices': choices,
      }

scenarios = {}
for dialog in data["results"]:
    id_scenarios = [id["number"]  for id in dialog["properties"]["id_scenario"]["rollup"]["array"]]
    character = dialog["properties"]["character"]["select"]["name"]
    backgroud = dialog["properties"]["backgroud"]["select"]["name"]
    expression  = dialog["properties"]["expression"]["select"]["name"]
    order = dialog["properties"]["order"]["number"] 
    name = dialog["properties"]["name"]["title"][0]['text']['content']
    voice = dialog["properties"]["voice"]["select"]['name']
    choices = {}
    i=0
    print()
    print('dialog["properties"]["id_choise"]["rollup"]["array"]')
    print(dialog["properties"]["id_choise"]["rollup"]["array"])
    print( dialog["properties"]["text_choise"]["rollup"]["array"])
    if dialog["properties"]["id_scenario"]["rollup"]["array"]:
        for choise in dialog["properties"]["id_choise"]["rollup"]["array"]:
            choices[choise['number']] = dialog["properties"]["text_choise"]["rollup"]["array"][i]["rich_text"][0]["text"]["content"]
            i += 1
    message = ''
    for mot in  dialog["properties"]["message"]["rich_text"]:
        message+= mot['text']['content']

    for id_scenario in id_scenarios:
        if id_scenario in scenarios.keys():
            scenarios[id_scenario]['dialogues'].append(make_format_dialog(character,backgroud,expression,name,choices,message,voice,order))
        else:

            scenarios[id_scenario] = { "dialogues": [make_format_dialog(character,backgroud,expression,name,choices,message,voice,order)]}

with open('./data/scenarios.json', "w") as fichier:
    json.dump(scenarios, fichier)