---
tags: ['rules for this project']
---

## method one

just create a folder with the same name as category in `./docs`.

and write post in `./docs/{new folder}/_posts`.

e.g.

ceate a category `test` and a post `How to add a category in site` with category `test` at a certain time.

```bash
./docs
└── test
    └── _posts
          └── 2019-07-15-How-to-add-a-category-in-site.md
```

## method two 

just add a front matter.

e.g.

```bash
categories: ["category_001", "category_002"]
```