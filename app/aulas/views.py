"""
Endpoints da API de aulas.
"""
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import Session
from app.database import get_session
from app.aulas.models import Aula
from app.aulas.schemas import AulaCreate, AulaUpdate
from app.aulas.crud import (
    get_aulas,
    get_aula,
    create_aula,
    update_aula,
    delete_aula
)

router = APIRouter()

@router.get("/", response_model=List[Aula], summary="Listar todas as aulas")
def list_aulas(session: Session = Depends(get_session)):
    return get_aulas(session)

@router.get("/{aula_id}", response_model=Aula, summary="Obter uma aula por ID")
def read_aula(aula_id: int, session: Session = Depends(get_session)):
    aula = get_aula(session, aula_id)
    if not aula:
        raise HTTPException(status_code=404, detail="Aula não encontrada")
    return aula

@router.post("/", response_model=Aula, summary="Criar nova aula")
def create(aula_data: AulaCreate, session: Session = Depends(get_session)):
    return create_aula(session, aula_data)

@router.put("/{aula_id}", response_model=Aula, summary="Atualizar uma aula")
def update(aula_id: int, aula_data: AulaUpdate, session: Session = Depends(get_session)):
    aula = update_aula(session, aula_id, aula_data)
    if not aula:
        raise HTTPException(status_code=404, detail="Aula não encontrada")
    return aula

@router.delete("/{aula_id}", summary="Deletar uma aula")
def delete(aula_id: int, session: Session = Depends(get_session)):
    success = delete_aula(session, aula_id)
    if not success:
        raise HTTPException(status_code=404, detail="Aula não encontrada")
    return {"detail": "Aula deletada com sucesso"}
