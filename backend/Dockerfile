# 使用多阶段构建
FROM python:3.12-buster as builder-image

# 设置环境变量
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# 安装系统依赖并更新 pip
COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    rm -rf /var/lib/apt/lists/*

# 运行时镜像
FROM python:3.12-slim-buster

# 从构建镜像中复制文件
COPY --from=builder-image /usr/local/bin /usr/local/bin
COPY --from=builder-image /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages

# 设置工作目录
WORKDIR /opt/code

EXPOSE 8000

# 启动命令
CMD ["uvicorn", "main", "--host", "0.0.0.0", "--port", "8081"]