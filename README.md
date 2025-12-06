<img width="2000" height="500" alt="Banner" src="https://github.com/user-attachments/assets/964b837b-47b6-4abb-af05-eab3683d27fe" />

<p align="center">
    <!-- Discord Badge -->
    <a href="https://discord.justus0405.com/"><img src="https://img.shields.io/discord/1370519315400495234?logo=Discord&colorA=1e1e2e&colorB=a6e3a1&style=for-the-badge"></a>
    <!-- Forks Badge -->
    <a href="https://github.com/Justus0405/LLM-Bot/forks"><img src="https://img.shields.io/github/forks/Justus0405/LLM-Bot?colorA=1e1e2e&colorB=ea999c&style=for-the-badge"></a>
    <!-- Stars Badge -->
    <a href="https://github.com/Justus0405/LLM-Bot/stargazers"><img src="https://img.shields.io/github/stars/Justus0405/LLM-Bot?colorA=1e1e2e&colorB=b7bdf8&style=for-the-badge"></a>
    <!-- Last Commit Badge -->
    <a href="https://github.com/Justus0405/LLM-Bot/commits/main/"><img src="https://img.shields.io/github/last-commit/Justus0405/LLM-Bot?logo=github&colorA=1e1e2e&colorB=cdd6f4&style=for-the-badge"></a>
</p>

## About

LLM-Bot is a Discord bot built with discord.js that brings LLMs directly into your server.
It can connect to multiple AI backends including OpenAI, Ollama, and Llama.cpp allowing you to chat with and query different models seamlessly.

When mentioned in a chat, LLM-Bot listens, processes your question, and replies using the selected LLM API.
Its designed to be modular, easy to configure, and perfect for integrating AI-powered assistants into your Discord community.

## Commands

Moderator Commands:

1. /help — Displays this message
2. /prompt set — Set the current personality
3. /prompt get — Get the current personality
4. /model set — Set the current model
5. /model get — Get the current model
6. /api url — Change the current API URL
7. /api key — Change the current API Key
8. /thinking — Toggle display of LLM thinking sections
9. /memory — Toggle message history
10. /debug — Toggle verbose log messages
11. /reset — Restart the bot and revert to default settings

> [!NOTE]
> All of these configuration options above can & need to be defined in .env .
> By default these commands require the "ModerateMembers" permission as a saftey measure, this can however be overwritten in the integrations tab of your guild.

## Installation

1. Clone the repository:

```shell
git clone --depth 1 https://github.com/Justus0405/LLM-Bot.git
```

2. Navigate to the directory:

```shell
cd LLM-Bot
```

3. Create a .env file from .env.example:

```shell
nano .env
```

4. Build and run with docker:

```shell
docker-compose up -d --build
```

## Run Dependencies

```plaintext
docker
docker-compose
docker-buildx
```

#

<p align="center">
	Copyright &copy; 2025-present <a href="https://github.com/Justus0405" target="_blank">Justus0405</a>
</p>

<p align="center">
	<a href="https://github.com/Justus0405/LLM-Bot/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Justus0405/LLM-Bot?logo=Github&colorA=1e1e2e&colorB=cba6f7&style=for-the-badge"></a>
</p>
