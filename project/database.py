"""
?discontinued
"""

from typing import List, Dict, Any
from sqlalchemy import create_engine, text, select, insert
from sqlalchemy.orm import Session
import os
from string import Template



class ORMConnect:
    def __init__(self):
        self.db = os.getenv("DATABASE")
        self.user = os.getenv("USER")
        self.host = os.getenv("HOST")
        self.password = os.getenv("PASSWORD")
        self.connect_template = Template("mysql+pymysql://$usr:$psw@$hst/$dbn?ssl_ca=cacert-2023-01-10.pem")
        self.db_connection_string = self.connect_template.substitute(
            usr=self.user,
            psw=self.password,
            dbn=self.db,
            hst=self.host)
        self.engine = \
            create_engine(self.db_connection_string)
        self.table = text('saferoom')

    @property  # << Might cause mischief
    def select(self) -> list[dict[str, Any]]:
        with Session(self.engine) as session:
            stmt = select(text('*')).select_from(self.table)
            execute = session.execute(stmt)
            # noinspection PyProtectedMember
            return [row._asdict() for row in execute.all()]

    def insert(self, /, *, name: str, workers: list, start: str, end: str):
        proc_workers = ', '.join(workers)
        stmt = insert(self.table)\
            .values(
            name=name,
            workers=proc_workers,
            start=start,
            end=end
        )
        with self.engine.connect() as conn:
            result = conn.execute(stmt)
            conn.commit()


orm = ORMConnect()
orm.insert(name="name", workers=["1", "2", "3"], start="now", end="later")
