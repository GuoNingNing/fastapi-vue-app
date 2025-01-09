import json
from pathlib import Path

import requests

file_path = Path("./openapi.json")

url = "http://localhost:8000/openapi.json"

response = requests.get(url)

# 检查请求是否成功
if response.status_code == 200:
    try:
        # 获取并解析 JSON 数据
        openapi_content = response.json()
        print("获取到 openapi.json")
        for path_data in openapi_content["paths"].values():
            for operation in path_data.values():
                if "tags" in operation:
                    tag = operation["tags"][0]
                    operation_id = operation["operationId"]
                    to_remove = f"{tag}-"
                    new_operation_id = operation_id[len(to_remove):]
                    operation["operationId"] = new_operation_id

        file_path.write_text(json.dumps(openapi_content))
        print("转换完成！")
    except ValueError as e:
        print("返回的数据不是有效的 JSON 格式:", e)
else:
    print(f"请求失败，状态码: {response.status_code}")
