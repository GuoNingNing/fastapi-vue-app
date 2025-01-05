import yt_dlp


def download_youtube_video(video_url, cookies_file=None):
    # 配置下载选项
    # 配置下载选项
    ydl_opts = {
        'format': 'bestvideo+bestaudio',  # 最佳视频和最佳音频
        'merge_output_format': 'mp4',  # 合并为 mp4 格式
        'outtmpl': '%(title)s.%(ext)s',  # 输出文件名格式
        'noprogress': True,  # 显示进度条
        # 'postprocessors': [{  # 后处理选项
        #     'key': 'FFmpegVideoRemuxer',  # 使用 FFmpeg 进行格式转换和合并视频
        # }],
    }

    if cookies_file:
        ydl_opts['cookiefile'] = cookies_file  # 添加 cookies 文件

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])  # 下载视频
        print("下载成功！")
    except Exception as e:
        print(f"下载失败: {e}")


# 使用示例
if __name__ == "__main__":
    url = "https://www.youtube.com/shorts/2ZrJ_PCdvn0"
    cookies_path = "cookies.txt"
    download_youtube_video(url, cookies_path)
