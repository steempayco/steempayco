"""
Feed
"""

import asyncio
import logging
import os
import json
import time
import datetime
from dynamodb import TransactionStore

from time import sleep
from concurrent.futures import ThreadPoolExecutor
from steem.blockchain import Blockchain
from steem.post import Post
from block_pointer import BlockPointer
from steem.steemd import Steemd
from steem import Steem

transactionStore = TransactionStore()

class TransferStream:
    log = logging.getLogger(__name__)
    last_shown_no = 0
    def __init__(self, block_pointer, config):
        self.bp = block_pointer
        self.start_stream()
        self.steem = Steem()
        self.filter_account = config['receiving_account']
        self.config = config

    def start_stream(self):
        self.log.info('Start new block chain and stream %s' % self.bp.last())

    def get(self):
        try:
            if not self.bp.last():
                self.bp.update(self.steem.head_block_number)
            block_no = self.bp.last()
            block = self.steem.get_block(block_no)
            if block == None:
                return None
            output = []
            for index, trans in enumerate(block['transactions']):
                if trans['operations'][0][0] == 'transfer':
                    transfer = trans['operations'][0][1]
                    if transfer['to'] == self.filter_account:
                        memo = transfer['memo'].split(' ')
                        timestamp = time.mktime(datetime.datetime.strptime(block['timestamp'], "%Y-%m-%dT%H:%M:%S").timetuple())*1000
                        transfer_detail = {
                            'block_num': block_no,
                            'tx_id': block['transaction_ids'][index],
                            'timestamp': block['timestamp'],
                            'from': transfer['from'],
                            'to': transfer['to'],
                            'amount': transfer['amount'],
                            'invoiceId': memo[0],
                            'memo': memo[1]
                        }
                        output.append(transfer_detail)
            if block_no > (self.last_shown_no + 100):
                self.last_shown_no = block_no
                self.log.info('Processing block: %s' % self.last_shown_no)
            self.bp.update(block_no + 1)
            return output
        except Exception as e:
            self.log.error('Failed receiving from the stream: ' + str(e))
            raise

class Feed:
    log = logging.getLogger(__name__)
    """ Feed """
    def __init__(self, config):
        self.config = config
        self.blockchain = Blockchain()
        self.loop = asyncio.get_event_loop()
        self.ps = TransferStream(BlockPointer(), config)
        self.executor = ThreadPoolExecutor(max_workers=1)
        self.instance = None
        self.run = False
        self.steem = Steem()

    def start(self):
        if not self.instance:
            self.run = True
            self.instance = self.executor.submit(self.work)
        else:
            raise Exception('Already running')

    def stop(self):
        self.log.info ('Stopping Feed')
        self.run = False
        self.instance.result()
        self.instance = None

    def work(self):
        self.log.info ('Start Feed')
        while self.run:
            try:
                trans = self.ps.get()
                if trans == None:
                    # No block is created yet
                    sleep(1)
                    continue
                for transfer in trans:
                    self.handle_data(transfer)
            except Exception as e:
                self.log.error("Failed collecting and processing the post")
                self.log.error(e)
                sleep(1)
        self.log.info ('End Feed')

    def is_valid(self, post):
        return True

    def handle_data(self, transfer):
        self.log.info(transfer)
        transactionStore.store(transfer)
        # Skip long comments
