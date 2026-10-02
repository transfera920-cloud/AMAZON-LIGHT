import re

with open('/tmp/routes.pretty.js', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('第一章')
func_start = text.rfind('function', 0, idx)
with open('/tmp/page_component.js', 'w', encoding='utf-8') as out:
    out.write(text[func_start:])
print('Success! Wrote /tmp/page_component.js, length:', len(text) - func_start)
