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

  // urlEncode 后长度小于20的，直接使用即可
  if (encodeURIComponent(data.slug).length < 20) {
    data.abbrlink = data.slug
    console.log('urlencode short. title: [%s], slug: [%s], dataId: [%s]', data.title, data.slug, data._id)
    model.save({
      _id: data._id,
      abbr: data.abbrlink
    })
    return data
  }

  // 不存在中文的，直接使用即可
  const cjkRegex = /[㐀-𫠚]/gm
  if (!cjkRegex.test(data.slug)) {
    data.abbrlink = data.slug
    console.log('slug not cjk. title: [%s], slug: [%s], dataId: [%s]', data.title, data.slug, data._id)
    model.save({
      _id: data._id,
      abbr: data.abbrlink
    })
    return data
  }

  // id生成策略 id_{crc32(文章id)}
  const abbr = `id_${crc32.str(data._id) >>> 0}`

  model.save({
    _id: data._id,
    abbr
  });
  data.abbrlink = abbr;
  console.log('gen abbrlink, title: [%s], slug: [%s], dataId: [%s]', data.title, data.slug, data._id)
  return data;
}

module.exports = postPermalinkFilter
