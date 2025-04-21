"""
Endpoints da API de tarefas.
"""
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import Session
from app.database import get_session
from app.tasks.models import Task
from app.tasks.schemas import TaskCreate, TaskUpdate
from app.tasks.crud import (
    get_tasks,
    get_task,
    create_task,
    update_task,
    delete_task
)

router = APIRouter()

@router.get("/", response_model=List[Task], summary="Listar todas as tarefas")
def list_tasks(session: Session = Depends(get_session)):
    return get_tasks(session)

@router.get("/{task_id}", response_model=Task, summary="Obter uma tarefa por ID")
def read_task(task_id: int, session: Session = Depends(get_session)):
    task = get_task(session, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return task

@router.post("/", response_model=Task, summary="Criar nova tarefa")
def create(task_data: TaskCreate, session: Session = Depends(get_session)):
    return create_task(session, task_data)

@router.put("/{task_id}", response_model=Task, summary="Atualizar uma tarefa")
def update(task_id: int, task_data: TaskUpdate, session: Session = Depends(get_session)):
    task = update_task(session, task_id, task_data)
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return task

@router.delete("/{task_id}", summary="Deletar uma tarefa")
def delete(task_id: int, session: Session = Depends(get_session)):
    success = delete_task(session, task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return {"detail": "Tarefa deletada com sucesso"}
