$(function () {
  'use strict'
  $('.tsArea').TapSuggest({
    tsInputElement: '.tsInput',
    tsArrayList: [
      ['天海 春香', 'あまみ はるか', 'Haruka Amami'],
      ['如月 千早', 'きさらぎ ちはや', 'Chihaya Kisaragi'],
      ['萩原 雪歩', 'はぎわら ゆきほ', 'Yukiho Hagiwara'],
      ['高槻 やよい', 'たかつき やよい', 'Yayoi Takatsuki'],
      ['秋月 律子', 'あきづき りつこ', 'Ritsuko Akizuki'],
      ['水瀬 伊織', 'みなせ いおり', 'Iori Minase'],
      ['三浦 あずさ', 'みうら あずさ', 'Azusa Miura'],
      ['双海 亜美', 'ふたみ あみ', 'Ami Futami'],
      ['双海 真美', 'ふたみ まみ', 'Mami Futami'],
      ['菊池 真', 'きくち まこと', 'Makoto Kikuchi'],
      ['星井 美希', 'ほしい みき', 'Miki Hosii'],
      ['我那覇 響', 'がなは ひびき', 'Hibiki Ganaha'],
      ['四条 貴音', 'しじょう たかね', 'Takane Shihou']
    ],
    tsRegExpAll: true
  });
});
