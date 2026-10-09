from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import routes

app = FastAPI(title="Patna Weather API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    return {"status": "ok"}


app.include_router(routes.router)
