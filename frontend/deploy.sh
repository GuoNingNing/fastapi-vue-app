#!/bin/bash

# 部署脚本：deploy.sh
# 用于前端项目的打包并部署到 Nginx

# 设置变量
PROJECT_DIR="/root/fastapi-vue-app/frontend"   # 前端项目路径
BUILD_DIR="$PROJECT_DIR/dist"                 # 打包输出目录
DEPLOY_DIR="/var/www/html/vue-app"            # Nginx 部署目录

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # 无颜色

# 检查项目路径是否存在
if [ ! -d "$PROJECT_DIR" ]; then
  echo -e "${RED}项目目录不存在: $PROJECT_DIR${NC}"
  exit 1
fi

# 进入项目目录
cd "$PROJECT_DIR" || exit 1

# 安装依赖
echo -e "${GREEN}安装依赖...${NC}"
pnpm install
if [ $? -ne 0 ]; then
  echo -e "${RED}依赖安装失败！${NC}"
  exit 1
fi

# 打包项目
echo -e "${GREEN}正在打包项目...${NC}"
pnpm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}打包失败！${NC}"
  exit 1
fi

# 检查打包目录是否生成
if [ ! -d "$BUILD_DIR" ]; then
  echo -e "${RED}打包目录未找到: $BUILD_DIR${NC}"
  exit 1
fi

# 清理 Nginx 部署目录
echo -e "${GREEN}清理 Nginx 部署目录...${NC}"
rm -rf "$DEPLOY_DIR"/*
if [ $? -ne 0 ]; then
  echo -e "${RED}清理部署目录失败！${NC}"
  exit 1
fi

# 拷贝打包文件到 Nginx 部署目录
echo -e "${GREEN}拷贝打包文件到 Nginx 部署目录...${NC}"
cp -r "$BUILD_DIR"/* "$DEPLOY_DIR"
if [ $? -ne 0 ]; then
  echo -e "${RED}文件拷贝失败！${NC}"
  exit 1
fi

# 重启 Nginx 服务
echo -e "${GREEN}重启 Nginx 服务...${NC}"
systemctl reload nginx
if [ $? -ne 0 ]; then
  echo -e "${RED}Nginx 重启失败！${NC}"
  exit 1
fi

echo -e "${GREEN}部署完成！前端已成功部署到 Nginx！${NC}"
exit 0
