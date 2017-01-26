import algorithm
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def welcome_user():
    if request.method == 'POST':
        results = [
        {'winID': '0', 'tabURL': 'https://www.facebook.com/'},
        {'winID': '0', 'tabURL': 'https://twitter.com/?lang=fr'},
        {'winID': '1', 'tabURL': 'http://www.sportingnews.com/'},
        {'winID': '1', 'tabURL': 'http://www.bbc.com/sport/tennis'},
        {'winID': '2', 'tabURL': 'http://www.asos.fr/?hrd=1'},
        {'winID': '2', 'tabURL': 'https://www.ae.com/international?cm=sIL-cILS'},
        {'winID': '3', 'tabURL': 'http://bigocheatsheet.com/'},
        {'winID': '3', 'tabURL': 'http://stackoverfellows.tk/'}

        ]
        # content = request.get_json()

        # tabIDs, tabURLs = parse_content(content)

        # tabClusters = algorithm.run_algorithm(int(content['nbWindows']), tabURLs)

        # for i in range(len(tabURLs)):
        #     obj_dict = {'winID': tabClusters[i], 'tabURL': tabURLs[i]}
        #     results.append(obj_dict)

        # print results
        return jsonify(results)
    else:
        return 'Hello, world!'


def parse_content(content):

    tabIDs = []
    tabURLs = []

    object_list = content['tabsInfo']

    for obj in object_list:
        tabIDs.append(obj['tabID'])
        tabURLs.append(obj['tabURL'])

    return tabIDs, tabURLs
