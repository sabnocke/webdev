from sqlalchemy import Select, text, TextClause
from sqlalchemy.exc import OperationalError  # * Implement catch for this
from sqlalchemy.orm import sessionmaker, InstrumentedAttribute
from typing import List, Union, Tuple
from Variables import Saferoom, Machine, Entry, Columns
from pprint import pprint


class EstablishedConnection:
    def __init__(self, mach: Machine) -> None:
        self.machine = mach
        self.Session = sessionmaker(self.machine.engine)

    def select(
        self,
        select_obj: InstrumentedAttribute = Saferoom,
        order_by: InstrumentedAttribute = Saferoom.id,
        selectors: Union[List[str], Tuple[str], str, Columns] = [],
        conditions: str | List[str] = "",
        and_: bool = True,
    ):
        processed_conditions = self.__process_conditions(conditions, and_)
        processed_selectors = self.__process_selectors(selectors)
        proc = bool(processed_conditions and processed_selectors)
        text_stmt = (
            text(
                f"SELECT {processed_selectors} FROM saferoom WHERE {processed_conditions}"
            )
            if proc
            else None
        )
        print(text_stmt)
        stmt = Select(select_obj).order_by(order_by)
        return self.__selectivity(text_stmt, stmt)

    def __selectivity(self, txtcl: TextClause | None, stmt: Select):
        with self.Session() as session:
            if txtcl != None:
                result = session.execute(txtcl)
            else:
                result = session.execute(stmt)
            return [Entry(*item._tuple()) for item in result.all()]

    def __process_conditions(self, conditions: str | List[str], and_: bool) -> str:
        if isinstance(conditions, str):
            return conditions
        else:
            separator = " AND " if and_ else " OR "
            return separator.join(conditions)

    def __process_selectors(
        self, selectors: Union[List[str], str, Columns, Tuple[str]]
    ) -> Union[str, List[str]]:
        if isinstance(selectors, str):
            return selectors
        elif isinstance(selectors, list) or isinstance(selectors, tuple):
            return ", ".join(selectors)
        else:
            return self.__process_selectors(selectors.value)


mach = Machine()
ec = EstablishedConnection(mach)
out = ec.select(selectors=Columns.all, conditions="processed_time >= 0")
pprint(out)
