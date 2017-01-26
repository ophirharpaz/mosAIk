import algorithm
from flask import Flask
from flask import request
from flask import jsonify


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


app = Flask(__name__)


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

            tab_clusters = algorithm.cluster_tabs(int(content['nbWindows']), tab_urls)

            for i in range(len(tab_urls)):
                obj_dict = {'winID': tab_clusters[i], 'tabURL': tab_urls[i]}
                results.append(obj_dict)

        print results
        return jsonify(results)
    else:
        return 'Hello, world!'


def parse_content(content):
    tab_ids = []
    tab_urls = []

    object_list = content['tabsInfo']

    for obj in object_list:
        tab_ids.append(obj['tabID'])
        tab_urls.append(obj['tabURL'])

    return tab_ids, tab_urls
