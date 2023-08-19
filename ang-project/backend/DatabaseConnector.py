from sqlalchemy import Column, Integer, String, DateTime, Engine, and_, or_, text, JSON
from sqlalchemy.orm import declarative_base, sessionmaker, Query, DeclarativeBase
from typing import List
from Variables import Methods
from configLoader import YAMLHandler, EngineCreator
import sqlite3


# class Tt(Base):
#     __tableName__ = "testTable"
#     id = Column(Integer, primary_key=True)
#     text = Column(String, nullable=False)

#     def __repr__(self):
#         return f"<Tt(id='{self.id}', text='{self.text}')>"


# class DatabaseConnector:
#     def __init__(self, engine: Engine):
#         super().__init__()
#         Base.metadata.create_all(checkfirst=True, bind=engine)
#         self.Session = sessionmaker(bind=engine)

#     def insert(self, data, id: int):
#         with self.Session() as session:
#             session.add(Tt(data=data, id=id))
#             session.commit()

#     def __query_by_method(self, /, *, method: Methods, limit: int, records: Query):
#         output = None
#         match method:
#             case "all":
#                 output = records.all()
#             case "first":
#                 output = records.first()
#             case "one":
#                 output = records.one()
#             case "distinct":
#                 output = records.distinct()
#             case "limit":
#                 output = records.limit(limit=limit if limit > 0 else 5)
#         return output

#     def query(
#         self,
#         /,
#         filter: List[str],
#         *,
#         intersect: bool = False,
#         method: Methods = Methods.all,
#         number: int = -1,
#     ):
#         filters = [text(condition) for condition in filter]
#         records = None
#         with self.Session() as session:
#             if len(filters) > 0:
#                 if intersect:
#                     records = session.query(Tt).filter(and_(*filters))
#                 else:
#                     records = session.query(Tt).filter(or_(*filters))
#             else:
#                 return self.__query_by_method(
#                     method=method, limit=number, records=session.query(Tt)
#                 )
#         return self.__query_by_method(method=method, limit=number, records=records)


class altDatabaseConnection:
    def __init__(self):
        self.yaml_acc = YAMLHandler()
        address = self.yaml_acc.get(("database", "address"))
        self.testForDatabase = self.yaml_acc.get(("database", "isCreated"))
        self.tableName = "input"
        self.yaml_acc.set("testValue", "Greetings!")
        if isinstance(address, str):
            self.connection = sqlite3.connect(address)
        self.cursor = self.connection.cursor()
        if not self.testForDatabase:
            self.cursor.execute(
                f"CREATE TABLE {self.tableName} (id NUMBER PRIMARY KEY, data TEXT NOT NULL)"
            )
            self.yaml_acc.set(("database", "isCreated"), True)

    def insert(self, data: tuple[int, str]):
        comm = f"INSERT INTO {self.tableName} ({data[0]}, '{data[1]}')"
        print(comm)

    def select(self, data: tuple[int, str], limit: int = -1):
        comm = []
        if limit > 1:
            comm = self.cursor.execute(
                f"SELECT id data FROM {self.tableName}"
            ).fetchmany(limit)
        elif limit == 1:
            comm = self.cursor.execute(
                f"SELECT id data FROM {self.tableName}"
            ).fetchone()
        elif limit == -1:
            comm = self.cursor.execute(
                f"SELECT id data FROM {self.tableName}"
            ).fetchall()
        return comm

    def select_by_filter(self, filter: str):
        rows = self.cursor.execute(
            f"SELECT id data FROM {self.tableName} WHERE data = ?", (filter)
        ).fetchall()
        return rows

    def update(self, data: str, filter: str):
        if filter:
            self.cursor.execute(
                "UPDATE ? SET data = ? WHERE id = ?", (self.tableName, data, filter)
            )
        else:
            self.cursor.execute("UPDATE ? SET data = ?", (self.tableName, data))

    def delete(self, id: int):
        self.cursor.execute("DELETE FROM ? WHERE id = ?", (self.tableName, id))


yloader = YAMLHandler("config.yaml")
adc = altDatabaseConnection()

"""
from contextlib import closing

with closing(sqlite3.connect("aquarium.db")) as connection:
    with closing(connection.cursor()) as cursor:
        rows = cursor.execute("SELECT 1").fetchall()
        print(rows)
"""
