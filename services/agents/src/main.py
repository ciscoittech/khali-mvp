from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: init Redis connection
    import redis.asyncio as aioredis

    try:
        app.state.redis = aioredis.from_url(settings.redis_url, decode_responses=True)
        await app.state.redis.ping()
    except Exception:
        app.state.redis = None
    yield
    # Shutdown
    if app.state.redis:
        await app.state.redis.aclose()


app = FastAPI(
    title="Khali - YouTube Shorts Generator",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

from src.routers import health, shorts  # noqa: E402

app.include_router(health.router)
app.include_router(shorts.router, prefix="/api")
