import os
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session

# Carrega as variáveis do arquivo .env
load_dotenv()

# Usa a variável de ambiente DATABASE_URL
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./tasks.db")
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    from app.tasks.models import Task
    from app.aulas.models import Aula
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
