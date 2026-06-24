from langfuse import Langfuse
from langfuse.langchain import CallbackHandler

from src.config import settings

_langfuse: Langfuse | None = None


def get_langfuse() -> Langfuse | None:
    global _langfuse
    if not settings.langfuse_public_key:
        return None
    if _langfuse is None:
        _langfuse = Langfuse(
            public_key=settings.langfuse_public_key,
            secret_key=settings.langfuse_secret_key,
            host=settings.langfuse_host,
        )
    return _langfuse


def get_callback(trace_name: str, metadata: dict | None = None) -> CallbackHandler | None:
    if not settings.langfuse_public_key:
        return None
    return CallbackHandler(
        public_key=settings.langfuse_public_key,
        secret_key=settings.langfuse_secret_key,
        host=settings.langfuse_host,
        trace_name=trace_name,
        metadata=metadata or {},
    )
