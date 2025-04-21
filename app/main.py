"""
Arquivo principal da aplicação FastAPI.
Responsável por iniciar o app, incluir middlewares e importar/registrar as rotas.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db_and_tables
from app.tasks.views import router as tasks_router
from app.aulas.views import router as aulas_router

app = FastAPI(title="To-Do e Aulas API", version="1.0.0")

# Middleware para permitir requisições de diferentes origens (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Aceita qualquer origem para fins de desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializa o banco de dados
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Inclui as rotas do módulo de tarefas
app.include_router(tasks_router, prefix="/tasks", tags=["Tarefas"])

# Inclui as rotas do módulo de aulas
app.include_router(aulas_router, prefix="/aulas", tags=["Aulas"])