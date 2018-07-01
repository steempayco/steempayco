"""
Bot
"""

import asyncio
import json
import logging
import os

from concurrent.futures import ThreadPoolExecutor
from time import sleep
from feed import Feed
from datetime import datetime
from collections import deque

CONFIG_FILE_PATH = 'resource/config.json'

class Engine:
    executor = ThreadPoolExecutor(max_workers=8)
    log = logging.getLogger(__name__)
    def __init__(self):
        with open(CONFIG_FILE_PATH) as config:    
            self.config = json.load(config)
        self.loop = asyncio.get_event_loop()
        self.feed = Feed(self.config)
        self.run_flag = True

    async def work(self):
        self.log.info('Start SteemPay Backend')
        loop = asyncio.get_event_loop()
        
        while self.run_flag:
            # Poll the queue every second
            await asyncio.sleep(3)

        self.feed.stop()

    def run(self):
        self.feed.start()
        return self.loop.run_until_complete(self.work())

    def stop(self):
        self.log.info('Stopping SteemPay Backend')
        self.run_flag = False
        self.feed.stop()
