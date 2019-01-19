# from google.cloud
# import six
#
#
# """Translates text into the target language.
#
# Target must be an ISO 639-1 language code.
# See https://g.co/cloud/translate/v2/translate-reference#supported_languages
# """
#
# def translate_to_english(text):
#     translate_client = translate.Client()
#
#     if isinstance(text, six.binary_type):
#         text = text.decode('utf-8')
#
#     # Text can also be a sequence of strings, in which case this method
#     # will return a sequence of results for each text.
#     result = translate_client.translate(
#         text, target_language="eng")
#
#     print(u'Text: {}'.format(result['input']))
#     print(u'Translation: {}'.format(result['translatedText']))
#     print(u'Detected source language: {}'.format(
#         result['detectedSourceLanguage']))