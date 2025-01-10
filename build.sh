#!/bin/bash

echo -e "${GREEN}调用 frontend 的 deploy.sh...${NC}"
cd ../frontend || exit 1
if ! ./deploy.sh; then
    echo -e "${RED}frontend 的 deploy.sh 执行失败！${NC}"
    exit 1
fi

# 调用 backend 的 deploy.sh restart_app
echo -e "${GREEN}调用 backend 的 deploy.sh restart...${NC}"
cd ../backend || exit 1
if ! ./deploy.sh restart; then
    echo -e "${RED}backend 的 deploy.sh restart 执行失败！${NC}"
    exit 1
fi

# 输出后端日志的前 10 行
echo -e "${GREEN}输出后端日志的前 10 行...${NC}"
head -n 10 "$LOG_FILE"
# end