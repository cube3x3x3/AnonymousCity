var searchCities = searchCities || {};

searchCities.exec = function(outputArea, opt_input){
  


/**
 * 半角カタカナを全角カタカナに変換
 * 
 * @param {String} str 変換したい文字列
 */
  var hankana2zenkana = function (str) {
    var kanaMap = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    };

    var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str
            .replace(reg, function (match) {
                return kanaMap[match];
            })
            .replace(/ﾞ/g, '゛')
            .replace(/ﾟ/g, '゜');
  };

  function createUL(list){
    var newUL = document.createElement("ul");
    for (var i = 0; i < list.length; i++){
      var li = document.createElement("li");
      li.textContent = list[i];
      newUL.appendChild(li);
    }
    return newUL;
  }
  
  //Convert kana into Roman characters.
  var convertKanaIntoRoman = function (str) {
    var romanTable = {
      //'ﾎｯｶｲﾄﾞｳ'
      'ガ': 'ga',  'ギ': 'gi',  'グ': 'gu',  'ゲ': 'ge',  'ゴ': 'go',  'ギャ': 'gya',  'ギュ': 'gyu',  'ギョ': 'gyo',
      'ザ': 'za',  'ジ': 'zi',  'ズ': 'zu',  'ゼ': 'ze',  'ゾ': 'zo',  'ジャ': 'zya',  'ジュ': 'zyu',  'ジョ': 'zyo',
      'ダ': 'da',  'ヂ': 'zi',  'ヅ': 'zu',  'デ': 'de',  'ド': 'do',  'ヂャ': 'zya',  'ヂュ': 'zyu',  'ヂョ': 'zyo',
      'バ': 'ba',  'ビ': 'bi',  'ブ': 'bu',  'ベ': 'be',  'ボ': 'bo',  'ビャ': 'bya',  'ビュ': 'byu',  'ビョ': 'byo',
      'パ': 'pa',  'ピ': 'pi',  'プ': 'pu',  'ペ': 'pe',  'ポ': 'po',  'ピャ': 'pya',  'ピュ': 'pyu',  'ピョ': 'pyo',
      'キャ': 'kya',  'キュ': 'kyu',  'キョ': 'kyo',
      'シャ': 'sya',  'シュ': 'syu',  'ショ': 'syo',
      'チャ': 'tya',  'チュ': 'tyu',  'チョ': 'tyo',
      'ニャ': 'nya',  'ニュ': 'nyu',  'ニョ': 'nyo',
      'ヒャ': 'hya',  'ヒュ': 'hyu',  'ヒョ': 'hyo',
      'ミャ': 'mya',  'ミュ': 'myu',  'ミョ': 'myo',
      'リャ': 'rya',  'リュ': 'ryu',  'リョ': 'ryo',
      'ア': 'a',  'イ': 'i',  'ウ': 'u',  'エ': 'e',  'オ': 'o',
      'カ': 'ka',  'キ': 'ki',  'ク': 'ku',  'ケ': 'ke',  'コ': 'ko',
      'サ': 'sa',  'シ': 'si',  'ス': 'su',  'セ': 'se',  'ソ': 'so',
      'タ': 'ta',  'チ': 'ti',  'ツ': 'tu',  'テ': 'te',  'ト': 'to',  
      'ナ': 'na',  'ニ': 'ni',  'ヌ': 'nu',  'ネ': 'ne',  'ノ': 'no',  
      'ハ': 'ha',  'ヒ': 'hi',  'フ': 'hu',  'ヘ': 'he',  'ホ': 'ho',  
      'マ': 'ma',  'ミ': 'mi',  'ム': 'mu',  'メ': 'me',  'モ': 'mo',  
      'ヤ': 'ya',  'ユ': 'yu',  'ヨ': 'yo',
      'ラ': 'ra',  'リ': 'ri',  'ル': 'ru',  'レ': 're',  'ロ': 'ro',  
      'ワ': 'wa',  'ヰ': 'i',  'ヱ ': 'e',  'ヲ': 'o',
      'ン': 'n',
    };

    var reg = new RegExp('(' + Object.keys(romanTable).join('|') + ')', 'g');
    return str
            .replace(reg, function (match) {
                return romanTable[match];
            })
            .replace(/ッ/g, 'tsu')
            .replace(/ﾟ/g, '゜');
  };

  function processFile(url, fCallback, var_args){
    function xhrSuccess(){
      this.callback.apply(this, this.arguments);
    }
    function xhrError(){
      console.error(this.statusText);
    }
    var request = new XMLHttpRequest();
    request.callback = fCallback;
    request.arguments = Array.prototype.slice.call(arguments, 2);
    request.onload = xhrSuccess;
    request.onerror = xhrError;
    request.open("get", url, true);
    request.send(null);
  }
  
  function csvParse(str){ // 読み込んだCSVデータが文字列として渡される
      var result = []; // 最終的な二次元配列を入れるための配列
      var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
   
      // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
      for(var i=0;i<tmp.length;++i){
          result[i] = tmp[i].split(',');
      }
   
      alert(result[1]); // 300yen
      return result;
  }

  function han2Roman(str){
    return convertKanaIntoRoman(hankana2zenkana(str));
  }

  function appendHitNames(outputArea){
    var nameArray = csvParse(this.responseText);
    for (var i = 0; i < nameArray.length; i++){
      tmp = new String(nameArray[i][3]); //ken
      tmp2 = new String(nameArray[i][4]); //city
      nameArray[i][3] = han2Roman(tmp);
      nameArray[i][4] = han2Roman(tmp2);
    }
    var newUL = createUL(nameArray);
    outputArea.appendChild(newUL);
  }

  var FILE_INDEX = 'japanese-city-name.csv';
  processFile(FILE_INDEX, appendHitNames, outputArea);


  window.alert(convertKanaIntoRoman(hankana2zenkana('ﾋﾞﾎﾛﾁｮｳ')));
  console.error(outputArea);
  var pTag = document.createElement('P');
  console.error(pTag);
  console.error(opt_input.value);
  pTag.textContent = convertKanaIntoRoman(hankana2zenkana(opt_input.value));
  console.error(pTag);
  outputArea.appendChild(pTag);


};
window['searchCities'] = searchCities;



//https://ja.wikipedia.org/wiki/%E5%85%A8%E5%9B%BD%E5%9C%B0%E6%96%B9%E5%85%AC%E5%85%B1%E5%9B%A3%E4%BD%93%E3%82%B3%E3%83%BC%E3%83%89
//http://www.soumu.go.jp/denshijiti/code.html
//https://ja.wikipedia.org/wiki/%E3%83%AD%E3%83%BC%E3%83%9E%E5%AD%97#.E8.A8.93.E4.BB.A4.E5.BC.8F.E3.81.AE.E8.A1.A8
