from enum import Enum
from typing import List, Union
from sqlalchemy.orm import declarative_base, Mapped, mapped_column, sessionmaker
from sqlalchemy import String, create_engine, URL, DATETIME
from datetime import datetime
from configLoader import YAMLHandler
from dataclasses import dataclass
from datetime import datetime
Base = declarative_base()


class Methods(Enum):
    all = "all"
    first = "first"
    one = "one"
    distinct = "distinct"
    limit = "limit"

@dataclass
class Entry:
    id: int
    name: str
    start: datetime
    end: datetime
    workers: str
    time: str

class Columns(Enum):
    id = "id"
    name: str = "order_name"
    start = "start_date"
    end = "end_date"
    workers = "workers"
    time = "processed_time"
    all = ["id", "order_name", "start_date", "end_date", "workers", "processed_time"]


yloader = YAMLHandler()

class Machine:
    def __init__(self) -> None:
        self.sql_url = URL.create(
            drivername="mysql+pymysql",
            username=yloader.get(arg="username"),
            password=yloader.get(arg="password"),
            host=yloader.get(arg="host"),
            database=yloader.get(arg="database"),
            query={"ssl_ca": r"./cacert-2023-08-22.pem"},
        )
        self.engine = create_engine(self.sql_url, echo=True)
    
    @property
    def session(self):
        return sessionmaker(self.engine)


class Saferoom(Base):
    __tablename__ = "saferoom"
    id: Mapped[int] = mapped_column(primary_key=True)
    order_name: Mapped[str] = mapped_column(String(1000))
    start_date: Mapped[datetime] = mapped_column(DATETIME)
    end_date: Mapped[datetime] = mapped_column(DATETIME)
    workers: Mapped[str] = mapped_column(String(500))
    processed_time: Mapped[str] = mapped_column(String(100))

    def __repr__(self):
        return f"id={self.id}: {self.order_name!r} | [{self.start_date}]-[{self.end_date}] | ({self.workers}) ~{self.processed_time}"
