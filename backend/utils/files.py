import os
import shutil


def create_file(file_path):
    try:
        with open(file_path, 'w'):
            pass
        print(f"成功创建文件 '{file_path}'。")
    except Exception as e:
        print(f"创建文件 '{file_path}' 出错：{str(e)}")


def read_file(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read()
        return content
    except Exception as e:
        print(f"读取文件 '{file_path}' 出错：{str(e)}")
        return None


def write_file(file_path, content):
    try:
        with open(file_path, 'w') as file:
            file.write(content)
        print(f"内容已成功写入 '{file_path}'。")
    except Exception as e:
        print(f"写入文件 '{file_path}' 出错：{str(e)}")


def copy_file(source_path, destination_path):
    try:
        shutil.copy2(source_path, destination_path)
        print(f"文件从 '{source_path}' 复制到 '{destination_path}' 成功。")
    except Exception as e:
        print(f"复制文件出错：{str(e)}")


def delete_file(file_path):
    try:
        os.remove(file_path)
        print(f"文件 '{file_path}' 已成功删除。")
    except Exception as e:
        print(f"删除文件 '{file_path}' 出错：{str(e)}")


def create_directory(directory_path):
    try:
        os.makedirs(directory_path)
        print(f"文件夹 '{directory_path}' 已成功创建。")
    except Exception as e:
        print(f"创建文件夹 '{directory_path}' 出错：{str(e)}")
