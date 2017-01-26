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
