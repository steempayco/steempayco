import logging

class BlockPointer:
    log = logging.getLogger(__name__)
    last_block = None
    LAST_BLOCK_NUM_FILE = "resource/last_block_num"
    def __init__(self):
        try:
            with open("resource/last_block_num", "r") as f:
                self.last_block = (int(f.read()))
                self.log.info('Start from block number %d' % self.last_block)
        except:
            self.log.info('First start!')

    def last(self):
        return self.last_block
    def update(self, block_num):
        if not self.last_block or self.last_block < block_num:
            self.last_block = block_num
            with open("resource/last_block_num", "w") as f:
                f.write(str(block_num))
