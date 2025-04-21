from sqlmodel import SQLModel
from typing import Optional


# Schema para criação de tarefa
class TaskCreate(SQLModel):
    title: str
    description: Optional[str] = None
    done: bool = False

# Schema para atualização de tarefa
class TaskUpdate(SQLModel):
    title: str
    description: Optional[str] = None
    done: bool = False
