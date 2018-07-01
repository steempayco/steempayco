import logging
import os
import signal
import sys
from engine import Engine

# Set Logger
logFormatter = logging.Formatter("%(asctime)s [%(levelname)-5.5s] %(message)s")
rootLogger = logging.getLogger()
rootLogger.setLevel(logging.INFO)

fileHandler = logging.FileHandler("./log/steempay.log")
fileHandler.setFormatter(logFormatter)
rootLogger.addHandler(fileHandler)

consoleHandler = logging.StreamHandler()
consoleHandler.setFormatter(logFormatter)
rootLogger.addHandler(consoleHandler)

if __name__ == "__main__":
    try:
        engine = Engine()
        engine.run()
    except KeyboardInterrupt as ki:
        engine.stop()