import yaml
import os
import re
from typing import List, Dict, Union, Any, Tuple
from sqlalchemy import create_engine, Engine
from collections import namedtuple, UserDict
from pprint import pprint


class YAMLHandler:
    def __init__(self, yamlfile: str = "config.yaml", path: str = os.getcwd()):
        self.yamlfile = yamlfile
        self.path = (
            path
            if bool(re.search(r"(?:frontend|backend)", path))
            else os.path.join(path, "backend")
        )
        self.properPath = self.findPath()
        self.yaml_dict = self.load()

    def findPath(self):
        for root, dirs, files in os.walk(self.path):
            if self.yamlfile in files:
                return os.path.join(root, self.yamlfile)
            else:
                raise FileNotFoundError

    def load(self) -> Dict[str, str]:
        if self.properPath:
            #print("properPath found")
            with open(self.properPath, "r") as f:
                config = yaml.safe_load(f)
                return config
        return {}

    def alter(self):
        if self.properPath:
            with open(self.properPath, "w") as f:
                yaml.dump(self.yaml_dict, f, indent=2)

    def get(self, args: tuple[str, str] = ("", ""), arg: str = "") -> Union[str, Any]:
        if (args):
            first = self.yaml_dict.get(args[0], None)
            if isinstance(first, dict):
                second = first.get(args[1], None)
            else:
                return first
            return second
        elif (arg):
            return self.yaml_dict.get(arg, None)
        else:
            raise Exception("ERROR: unspecified arguments")
        

    def set(self, address: Union[Tuple[str, str], str], data):
        try:
            if isinstance(address, str):
                first = address
                second = ""
            elif isinstance(address, tuple):
                first, second = address
            if second == "":
                self.yaml_dict[first] = data
            else:
                if isinstance(fir := self.yaml_dict[first], dict) and fir:
                    fir[second] = data
        except Exception as e:
            print("".format(e))
        finally:
            self.alter()


class EngineCreator:
    def __init__(self, address):
        self.address = address

    def create(self, /, *, address: Union[os.PathLike, str]) -> Engine:
        address = f"sqlite:///{address}"
        return create_engine(address, echo=True)


# yloader = YAMLHandler()
# yloader.set(("database", "isCreated"), True)
