from enum import Enum
from typing import List, Union


class Methods(Enum):
    all = "all"
    first = "first"
    one = "one"
    distinct = "distinct"
    limit = "limit"


class TreeNode:
    def __init__(self, _string: str):
        self.data = _string
        self.children: List[Union[str, TreeNode]] = []
