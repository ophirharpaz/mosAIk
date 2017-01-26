"""
algorithm.py is the interface for calling the clustering function.
On the server side, the call should look like:
    algorithm.cluster_tabs(num_windows, tab_urls)
Make sure to comment out all unnecessary calls to inaccurate clustering functions.
Author: mosAIk
"""


import lda
from random import randint


def cluster_tabs(num_windows, tab_urls):
    """
    Function to run the actual algorithm
    """
    # Random:
    # result = [randint(0, nbWindows-1) for i in range(len(algo_input))]

    # LDA:
    result = lda.cluster_tabs(num_windows, tab_urls)

    # K-MEANS:

    return result


def mock_cluster_tabs(num_windows, tab_urls):
    return [i % num_windows for i in range(len(tab_urls))]
