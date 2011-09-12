---
layout: nil
---
{% for post in site.posts %}---POST_URL_S---{{ post.url }}---POST_URL_E------POST_TITLE_S---{{ post.title }}---POST_TITLE_E------POST_DATE_S---{{ post.date | date: "%Y/%m/%d" }}---POST_DATE_E---{{ post.title }}{{ post.content | strip_newlines}}---POST_SPLIT---{% endfor %}