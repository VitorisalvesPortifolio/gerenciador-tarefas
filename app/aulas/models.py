"""
Modelo de dados para aulas.
"""
from sqlmodel import SQLModel, Field
from typing import Optional

class Aula(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    descricao: Optional[str] = None
    data_entrega: str
    done: bool = False
