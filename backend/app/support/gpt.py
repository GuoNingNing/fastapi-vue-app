from openai import OpenAI

from config.database import openai_settings

__client = OpenAI(
    base_url=openai_settings.OPENAI_BASE_URL,  # This is the default and can be omitted
    api_key=openai_settings.OPENAI_API_KEY,  # This is the default and can be omitted
)


def text(messages, stream=False):
    """
    发送消息
    :param messages:
    :param stream:
    :return:
    """
    response = __client.chat.completions.create(
        messages=messages,
        model="gpt-4o-mini",
        stream=stream
    )

    content = ""
    if stream:
        print("Streaming...")
        for chunk in response:
            if len(chunk.choices) > 0 and chunk.choices[0].delta.content is not None:
                msg = chunk.choices[0].delta.content or ""
                content += msg
                yield msg
    #
    else:
        content = response.choices[0].message.content or ""
        yield content


if __name__ == '__main__':
    r = text([{'role': 'user', 'content': '使用Python写一个递归'}], False)

    for m in r:
        print(m, end='')
