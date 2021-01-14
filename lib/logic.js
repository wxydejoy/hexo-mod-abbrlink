'use strict';

var crc32 = require('./crc32');

const cjkRegex = /[㐀-𫠚]/gm

let t = true

function postPermalinkFilter(data) {
  // 手动配置了 abbrlink 的
  if (data.abbrlink) {
    console.log('manual abbrlink', data.abbrlink)
    return data;
  }

  if (t) {
    console.log('data', data)
    t = false
  }

  console.log('before abbrlink, title: [%s], slug: [%s]', data.title, data.slug, data.abbrlink, data._id)

  // urlEncode 后长度小于20的，直接使用即可
  if (encodeURIComponent(data.slug).length < 20) {
    data.abbrlink = data.slug
    return data
  }

  // 不存在中文的，直接使用即可
  if (!cjkRegex.test(data.slug)) {
    data.abbrlink = data.slug
    return data
  }

  // 缓存优化
  const model = this.model('mod-abbrlink');
  const cache = model.findById(data._id);
  if (cache && cache.abbr) {
    data.abbrlink = cache.abbr;
    console.log('cache abbrlink', data.abbrlink)
    return data;
  }

  // id生成策略 id_{crc32(文章id)}
  const abbr = `id_${crc32.str(data._id) >>> 0}`

  model.save({
    _id: data._id,
    abbr
  });
  data.abbrlink = abbr;
  console.log('after abbrlink, abbr: [%s], _id: [%s]', data.abbrlink, data._id)
  return data;
}

module.exports = postPermalinkFilter
