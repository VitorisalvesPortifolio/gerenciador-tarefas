"""
Funções CRUD para tarefas.
"""
from sqlmodel import Session, select
from app.tasks.models import Task
from app.tasks.schemas import TaskCreate, TaskUpdate

# Cria uma nova tarefa no banco de dados
def create_task(session: Session, task_data: TaskCreate):
    task = Task(**task_data.model_dump())
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

# Recupera todas as tarefas
def get_tasks(session: Session):
    return session.exec(select(Task)).all()

# Recupera uma tarefa específica
def get_task(session: Session, task_id: int):
    return session.get(Task, task_id)

# Atualiza uma tarefa existente
def update_task(session: Session, task_id: int, task_data: TaskUpdate):
    task = get_task(session, task_id)
    if not task:
        return None
    for key, value in task_data.model_dump(exclude_unset=True).items():
        setattr(task, key, value)
    session.commit()
    session.refresh(task)
    return task

# Deleta uma tarefa
def delete_task(session: Session, task_id: int):
    task = get_task(session, task_id)
    if not task:
        return False
    session.delete(task)
    session.commit()
    return True


