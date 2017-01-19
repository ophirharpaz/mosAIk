from random import randint

def run_algorithm(nbWindows, algo_input):
    """
    Function to run the actual algorithm
    """
    result = [randint(0, nbWindows-1) for i in range(len(algo_input))]
    return result