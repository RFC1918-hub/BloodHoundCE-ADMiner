# use python image 
FROM python:3.11

ENV PIPX_HOME=/opt/pipx \
    PIPX_BIN_DIR=/opt/pipx/bin \
    PIPX_DEFAULT_PYTHON=python3.11 \ 
    PATH=/opt/pipx/bin:${PATH}

RUN apt-get update && apt-get install -y curl && \
    apt-get install -y git && \
    python3 -m pip install --upgrade pip && \
    python3 -m pip install pipx && \
    python3 -m pipx ensurepath && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# install AD_miner using pipx 
RUN pipx install 'git+https://github.com/Mazars-Tech/AD_Miner.git'

# set the working directory in the container
WORKDIR /app

ENTRYPOINT ["AD-miner"]