"""
Funções CRUD para aulas.
"""
from sqlmodel import Session, select
from app.aulas.models import Aula
from app.aulas.schemas import AulaCreate, AulaUpdate

# Cria uma nova aula no banco de dados
def create_aula(session: Session, aula_data: AulaCreate):
    aula = Aula(**aula_data.model_dump())
    session.add(aula)
    session.commit()
    session.refresh(aula)
    return aula

# Recupera todas as aulas
def get_aulas(session: Session):
    return session.exec(select(Aula)).all()

# Recupera uma aula específica
def get_aula(session: Session, aula_id: int):
    return session.get(Aula, aula_id)

# Atualiza uma aula existente
def update_aula(session: Session, aula_id: int, aula_data: AulaUpdate):
    aula = get_aula(session, aula_id)
    if not aula:
        return None
    for key, value in aula_data.model_dump(exclude_unset=True).items():
        setattr(aula, key, value)
    session.commit()
    session.refresh(aula)
    return aula

# Deleta uma aula
def delete_aula(session: Session, aula_id: int):
    aula = get_aula(session, aula_id)
    if not aula:
        return False
    session.delete(aula)
    session.commit()
    return True


