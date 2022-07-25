This directory contains the pandoc template used to render the markdown files in this repository.

To render a specific file, you need to run the following command:
```
pandoc --from commonmark_x input_file --output=output_file --template=template.html --lua-filter=links-to-html.lua
```
