import logging
from typing import Dict, Optional

import pandas as pd
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


def sniffing_video_info(video_url: str, cookies_file=None) -> Optional[Dict]:
    """获取并打印 YouTube 视频的信息"""
    ydl_opts = {'cookiefile': cookies_file} if cookies_file else {}

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(video_url, download=False)
        # subtitles = ydl.list_subtitles(info_dict['id'], 'en')
        logging.info("视频信息:")
        logging.info(f"标题: {info_dict.get('title')}")
        logging.info(f"作者: {info_dict.get('uploader')}")
        logging.info(f"发布时间: {info_dict.get('upload_date')}")
        logging.info(f"点赞数: {info_dict.get('like_count')}")
        logging.info(f"观看次数: {info_dict.get('view_count')}")
        logging.info(f"描述: {info_dict.get('description')}")
        logging.info(f"字幕: {info_dict.get('subtitles', '无可用字幕')}")
        return info_dict


def get_best_video_info(video_url: str, cookies_file=None) -> Optional[Dict]:
    dicts = sniffing_video_info(video_url, cookies_file=cookies_file)
    best = {}
    if dicts:
        best['标题'] = dicts.get('title')
        best['作者'] = dicts.get('uploader')
        best['发布时间'] = dicts.get('upload_date')
        best['点赞数'] = dicts.get('like_count')
        best['观看次数'] = dicts.get('view_count')
        best['描述'] = dicts.get('description')
        best['字幕'] = dicts.get('subtitles', '无可用字幕')
        df = pd.DataFrame(dicts['formats'])
        best['视频'] = df.loc[df['filesize'].idxmax()]['url']
        best['音频'] = df.loc[df[df['fps'].isna()]['filesize'].idxmax()]['url']

    return best


# 使用示例
if __name__ == "__main__":
    url = "https://www.youtube.com/watch?v=wW3peA63EUA&t=17s"
    cookies_path = "../storage/cookies.txt"
    info = sniffing_video_info(url, cookies_path)
    print(info['formats'])

    # 设置选项以显示所有行和列
    pd.set_option('display.max_rows', None)  # 显示所有行
    pd.set_option('display.max_columns', None)  # 显示所有列
    df = pd.DataFrame(info['formats'])
    print(df.head())
    # 筛选 container 列为 NaN 的行
    df_nan_container = df[df['container'].isna()]
    # 获取 format_note 列最大值对应的行
    max_media_row = df[df['container'].isna()].loc[df_nan_container['format_note'].idxmax()]
    max_video_row = df.loc[df['format_note'].idxmax()]
    print(max_media_row['format_note'], max_media_row['url'])
    print(max_video_row['format_note'], max_video_row['url'])
