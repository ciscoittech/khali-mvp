from pydantic_settings import BaseSettings


MODEL_PRICING = {
    "deepseek/deepseek-v4-flash": {"input": 0.10, "output": 0.30},
}


class Settings(BaseSettings):
    app_name: str = "khali-agents"
    debug: bool = False

    # OpenRouter
    openrouter_api_key: str = ""
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    default_model: str = "deepseek/deepseek-v4-flash"

    # Redis
    redis_url: str = "redis://localhost:6379/5"

    # Langfuse
    langfuse_host: str = "http://localhost:3000"
    langfuse_public_key: str = ""
    langfuse_secret_key: str = ""

    # Video generation (Veo 3.1 Lite via OpenRouter)
    video_model: str = "google/veo-3.1-lite"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
