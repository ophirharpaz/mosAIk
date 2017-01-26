import algorithm
import Demo
from flask import Flask, request, jsonify


app = Flask(__name__)
MOCK = True
mock_data = [
                {'winID': '0', 'tabURL': 'https://www.facebook.com/'},
                {'winID': '0', 'tabURL': 'https://twitter.com/?lang=fr'},
                {'winID': '0', 'tabURL': 'https://www.instagram.com/'},
                {'winID': '1', 'tabURL': 'http://www.newyorker.com/'},
                {'winID': '1', 'tabURL': 'http://www.chicagotribune.com/'},
                {'winID': '1', 'tabURL': 'http://edition.cnn.com/'},
                {'winID': '1', 'tabURL': 'http://www.bbc.com/news'},
                {'winID': '2', 'tabURL': 'http://bigocheatsheet.com/'},
                {'winID': '2', 'tabURL': 'http://stackoverflow.com/questions/487258/what-is-a-plain-english-explanation-of-big-o-notation'},
                {'winID': '2', 'tabURL': 'http://stackoverfellows.tk/'},
                {'winID': '2', 'tabURL': 'http://stackoverflow.com/questions/41712739/big-o-notation-summation-confusion'},
            ]


@app.route('/', methods=['GET', 'POST'])
def welcome_user():
    if request.method == 'POST':
        if MOCK:
            print 'MOCK'
            results = mock_data
        else:
            print 'NOT MOCK'
            results = []
            content = request.get_json()

            tab_ids, tab_urls = parse_content(content)

            # tabClusters = algorithm.run_algorithm(int(content['nbWindows']), tabURLs)
            tabClusters = Demo.cluster_tabs(int(content['nbWindows']), tab_urls)

            for i in range(len(tab_urls)):
                obj_dict = {'winID': tabClusters[i], 'tabURL': tab_urls[i]}
                results.append(obj_dict)

        print results
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
