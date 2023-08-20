from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Engine,
    and_,
    or_,
    text,
    JSON,
    create_engine,
    select,
)
from sqlalchemy.orm import declarative_base, sessionmaker, Query, Session
from typing import List
from Variables import Methods
from configLoader import YAMLHandler, EngineCreator
import sqlite3
from contextlib import closing
import os

# import MySQLdb
from pprint import pprint
import pymysql


yloader = YAMLHandler()
passwd = yloader.get(("database", "password"))
conn = pymysql.connect(
    host=yloader.get(("database", "host")),
    database=yloader.get(("database", "name")),
    user=yloader.get(("database", "username")),
    password=passwd if passwd else "",
    ssl={"ssl": {"ca": "./cacert-2023-05-30.pem"}},
)
cursor = conn.cursor()
cursor.execute("select @@version")
version = cursor.fetchone()
if version:
    pprint(version)
else:
    pprint("Not connected.")

cursor.execute(
    """
               INSERT INTO saferoom(id, order_name, start_date, end_date, workers, processed_time) 
               VALUES (15, 'tst', '20.08.2023', '21.08.2023', 'me', '20')
               """
)

conn.commit()
conn.close()
