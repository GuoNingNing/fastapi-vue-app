#!/bin/bash

# 管理 Python 后端服务的脚本（支持 Conda 环境切换）

# 配置
APP_NAME="main.py"              # Python 后端入口文件
APP_DIR="$(dirname "$0")"       # 自动获取脚本所在目录作为 APP_DIR
ENV_NAME="py312"                # Conda 环境名称
LOG_FILE="/var/log/app.log"     # 日志文件路径
PID_FILE="/var/run/app.pid"     # PID 文件路径

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # 无颜色

# 激活 Conda 环境
activate_conda_env() {
    echo -e "${GREEN}切换到 Conda 环境：$ENV_NAME...${NC}"
    if ! source "$(conda info --base)/etc/profile.d/conda.sh"; then
        echo -e "${RED}无法找到 Conda，请确认 Conda 已正确安装！${NC}"
        exit 1
    fi
    if ! conda activate "$ENV_NAME"; then
        echo -e "${RED}激活 Conda 环境失败，请确认环境名称：$ENV_NAME 是否正确！${NC}"
        exit 1
    fi
}

start_app() {
    echo -e "${GREEN}启动后端服务...${NC}"
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo -e "${RED}服务已经在运行！PID: $(cat $PID_FILE)${NC}"
        exit 1
    fi

    # 激活 Conda 环境
    activate_conda_env

    cd "$APP_DIR" || exit 1
    nohup python "$APP_NAME" > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    echo -e "${GREEN}服务已启动！PID: $(cat $PID_FILE)${NC}"
}

stop_app() {
    echo -e "${GREEN}停止后端服务...${NC}"
    if [ ! -f "$PID_FILE" ] || ! kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo -e "${RED}服务未运行！${NC}"
        exit 1
    fi

    kill -9 $(cat "$PID_FILE")
    rm -f "$PID_FILE"
    echo -e "${GREEN}服务已停止！${NC}"
}

restart_app() {
    echo -e "${GREEN}重启后端服务...${NC}"
    stop_app
    start_app
}

status_app() {
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo -e "${GREEN}服务正在运行！PID: $(cat $PID_FILE)${NC}"
    else
        echo -e "${RED}服务未运行！${NC}"
    fi
}

case "$1" in
    start)
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        restart_app
        ;;
    status)
        status_app
        ;;
    *)
        echo -e "${RED}用法: $0 {start|stop|restart|status}${NC}"
        exit 1
        ;;
esac
