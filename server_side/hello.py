import algorithm
from flask import Flask
from flask import request
from flask import jsonify


MOCK = True
app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def welcome_user():
    print 'reached functions'
    if request.method == 'POST':
        content = request.get_json()
        num_windows = int(content['nbWindows'])
        results = [[] for i in range(num_windows)]

        tab_ids, tab_urls = parse_content(content)

        if MOCK:
            tab_clusters = algorithm.mock_cluster_tabs(num_windows,tab_urls)
        else:
            tab_clusters = algorithm.cluster_tabs(num_windows, tab_urls)

        print 'clusters: {}'.format(tab_clusters)

        # Generate result
        # assumes that for nbWindows = n, clusters indices are 0, 1, ..., n - 1
        for i in range(len(tab_urls)):
            cluster = tab_clusters[i]
            obj = {
                'cluster': cluster,
                'tab_url': tab_urls[i],
                'tab_id': tab_ids[i]
            }
            results[cluster].append(obj)

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
