---
layout: nil
---
{% for post in site.posts %}{% if post.category != 'private' %}---POST_URL_S---{{ post.url }}---POST_URL_E---{{ post.title }}{{ post.content | strip_newlines}}---POST_SPLIT---{% endif %}{% endfor %}