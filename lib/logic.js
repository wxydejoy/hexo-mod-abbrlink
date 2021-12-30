'use strict';

var crc32 = require('./crc32');

function postPermalinkFilter(data) {
  // 手动配置了 abbrlink 的
  if (data.abbrlink) {
    return data;
  }

  // 缓存优化
  const model = this.model('mod-abbrlink');
  const cache = model.findById(data._id);
  if (cache && cache.abbr) {
    data.abbrlink = cache.abbr;
    return data;
  }


  // id生成策略 id_{crc32(文章id)}
  const abbr = `${(crc32.str(data.title) >>> 0).toString(16)}`

  model.save({
    _id: data._id,
    abbr
  });
  data.abbrlink = abbr;
  console.log('gen abbrlink, title: [%s], slug: [%s], dataId: [%s]', data.title, data.slug, data._id)
  return data;
}

module.exports = postPermalinkFilter
