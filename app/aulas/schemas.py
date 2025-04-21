"""
Schemas para entrada e saída de dados da API de aulas.
"""
from pydantic import BaseModel
from typing import Optional

class AulaBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    data_entrega: str

class AulaCreate(AulaBase):
    pass

class AulaUpdate(AulaBase):
    pass
