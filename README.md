# hexo-mod-abbrlink
A [Hexo plugin](https://hexo.io/plugins/) to generate static post link based on post titles by myself

hexo 插件，用于为文章生成一个看起来短一些的链接

自用，没什么逻辑

## How to install 如何安装

Add plugin to Hexo 添加插件:

- mod package.json, add a dependency for: 修改package.json 文件，添加一行 dependency
  ```
  "hexo-mod-abbrlink": "git+https://github.com/zzmark/hexo-mod-abbrlink.git
  ```

- execute `npm install` or `yarn install`

- Modify permalink in config.yml file like:
  ```
  permalink: posts/:abbrlink/
  # or
  permalink: :year/:month/:abbrlink/
  ```

## dev

这插件可以当作模板，实现自己的规则，随自己兴趣了

只需按照自己想要的格式，将结果写入 abbrlink 即可
