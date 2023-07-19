import 'package:test/test.dart';
import 'package:gurmukhi_utils/gurmukhi_utils.dart';

void main() {
  group('ascii to gurmukhi:', () {
    test('basic', () {
      expect(asciiToGurmukhi('123'), '੧੨੩');
      expect(asciiToGurmukhi('<> > <'), 'ੴ ☬ ੴ');
      expect(asciiToGurmukhi('gurU'), 'ਗੁਰੂ');
    });

    test('diacritics', () {
      expect(asciiToGurmukhi('kRwN'), 'ਕ੍ਰਾਂ');
      expect(asciiToGurmukhi('sÍwNiq'), 'ਸ੍ਵਾਂਤਿ');
      expect(asciiToGurmukhi('iBRMg'), 'ਭ੍ਰਿੰਗ');
      expect(asciiToGurmukhi('inR`qy'), 'ਨ੍ਰਿੱਤੇ');
      expect(asciiToGurmukhi('ik®`sM'), 'ਕ੍ਰਿੱਸੰ');
      expect(asciiToGurmukhi('AMimR`q'), 'ਅੰਮ੍ਰਿੱਤ');
      expect(asciiToGurmukhi('Qwin´M'), 'ਥਾਨੵਿੰ');
      expect(asciiToGurmukhi('kRwNq'), 'ਕ੍ਰਾਂਤ');
      expect(asciiToGurmukhi('k®ü`D'), 'ਕ੍ਰੁੱਧ');
      expect(asciiToGurmukhi('ijnHYN'), 'ਜਿਨ੍ਹੈਂ');
      expect(asciiToGurmukhi('hÍüYbo'), 'ਹ੍ਵੈੁਬੋ');
      expect(asciiToGurmukhi('nUµ'), 'ਨੂੰ');
      expect(asciiToGurmukhi('^u`d'), 'ਖ਼ੁੱਦ');
      expect(asciiToGurmukhi('PzUM'), 'ਫਜ਼ੂੰ');
      expect(asciiToGurmukhi('kwrmu`l-k`rwm'), 'ਕਾਰਮੁੱਲ-ਕੱਰਾਮ');
      expect(asciiToGurmukhi('&ru¤^y'), 'ਫ਼ਰੁੱਖ਼ੇ');
      expect(asciiToGurmukhi('^u¤ro'), 'ਖ਼ੁੱਰੋ');
      expect(asciiToGurmukhi('duoAwlY'), 'ਦੋੁਆਲੈ');
      expect(asciiToGurmukhi('idRV@IAw'), 'ਦ੍ਰਿੜੑੀਆ');
      expect(asciiToGurmukhi('kwn@ü'), 'ਕਾਨੑੁ');
      expect(asciiToGurmukhi('ijMn@I'), 'ਜਿੰਨੑੀ');
      expect(asciiToGurmukhi('El@w'), 'ਓਲੑਾ');
      expect(asciiToGurmukhi('swm@Y'), 'ਸਾਮੑੈ');
      expect(asciiToGurmukhi('kqybhuˆ'), 'ਕਤੇਬਹੁਂ');
    });

    test('sihari', () {
      expect(asciiToGurmukhi('BuiKAw.'), 'ਭੁਖਿਆ.');
      expect(asciiToGurmukhi('BuiKAw.'), 'ਭੁਖਿਆ.');
      expect(asciiToGurmukhi('ਭੁਖiਆ.'), 'ਭੁਖਿਆ.');
      expect(asciiToGurmukhi('ਮi'), 'ਮਿ');
      expect(asciiToGurmukhi('ਮiਲ'), 'ਮਿਲ');
      expect(asciiToGurmukhi('ਮil'), 'ਮਲਿ');
      expect(asciiToGurmukhi('suMi\\Aw'), 'ਸੁੰਞਿਆ');
      expect(asciiToGurmukhi('|i||'), 'ਙਙਿਙ');
      expect(asciiToGurmukhi('di&'), 'ਦਫ਼ਿ');
    });

    test('nasalization', () {
      expect(asciiToGurmukhi('iQqMØI'), 'ਥਿਤੀੰ');
      expect(asciiToGurmukhi('kMØI'), 'ਕੀੰ');
      expect(asciiToGurmukhi('nµØIbu'), 'ਨੀੰਬੁ');
      expect(asciiToGurmukhi('nµØIbw'), 'ਨੀੰਬਾ');
      expect(asciiToGurmukhi('dyNih'), 'ਦੇਂਹਿ');
    });

    test('sant lipi bindi before bihari', () {
      expect(asciiToGurmukhi('guxˆØI', extensions: true), 'ਗੁਣੀਁ');
      expect(asciiToGurmukhi('sKˆØI', extensions: true), 'ਸਖੀਁ');
    });

    test('conversions', () {
      expect(asciiToGurmukhi('DR¨A'), 'ਧ੍ਰੂਅ');
      expect(asciiToGurmukhi('AwilsÎ'), 'ਆਲਿਸ੍ਯ');
      expect(asciiToGurmukhi('dwin'), 'ਦਾਨਿ');
      expect(asciiToGurmukhi('BIqir'), 'ਭੀਤਰਿ');
      expect(asciiToGurmukhi('jIau'), 'ਜੀਉ');
      expect(asciiToGurmukhi('[1[2[3[4[5['), '।੧।੨।੩।੪।੫।');
      expect(asciiToGurmukhi(']1]2]3]4]5]'), '॥੧॥੨॥੩॥੪॥੫॥');
      expect(asciiToGurmukhi('sauifsies'), 'ਸਉਡਿਸਇਸ');
      expect(asciiToGurmukhi('z`rrw'), 'ਜ਼ੱਰਰਾ');
      expect(asciiToGurmukhi('^urSYd'), 'ਖ਼ੁਰਸ਼ੈਦ');
      expect(asciiToGurmukhi('luqi&'), 'ਲੁਤਫ਼ਿ');
      expect(asciiToGurmukhi('iekMqR'), 'ਇਕੰਤ੍ਰ');
      expect(asciiToGurmukhi('pRBU'), 'ਪ੍ਰਭੂ');
    });

    test('subscripts', () {
      expect(asciiToGurmukhi('isRis†'), 'ਸ੍ਰਿਸ੍ਟਿ');
      expect(asciiToGurmukhi('ik®s˜M'), 'ਕ੍ਰਿਸ੍ਨੰ');
      expect(asciiToGurmukhi('dsœgIrI'), 'ਦਸ੍ਤਗੀਰੀ');
      expect(asciiToGurmukhi('insçl'), 'ਨਿਸ੍ਚਲ');
      expect(asciiToGurmukhi('sÍwd'), 'ਸ੍ਵਾਦ');
      expect(asciiToGurmukhi('suDwK´r'), 'ਸੁਧਾਖੵਰ');
      expect(asciiToGurmukhi('cVH¨'), 'ਚੜ੍ਹੂ');
      expect(asciiToGurmukhi('cV§'), 'ਚੜ੍ਹੂ');
      expect(asciiToGurmukhi('im´wny'), 'ਮੵਿਾਨੇ');
      expect(asciiToGurmukhi('iD´wvY'), 'ਧੵਿਾਵੈ');
      expect(asciiToGurmukhi('idÍj'), 'ਦ੍ਵਿਜ');
      expect(asciiToGurmukhi('iBKÏw'), 'ਭਿਖੵਾ');
      expect(asciiToGurmukhi('imQÏMq'), 'ਮਿਥੵੰਤ');
      expect(asciiToGurmukhi('imQ´Mq'), 'ਮਿਥੵੰਤ');
      expect(asciiToGurmukhi('rKÏw'), 'ਰਖੵਾ');
      expect(asciiToGurmukhi('sMswrsÏ'), 'ਸੰਸਾਰਸੵ');
    });

    test('yayya', () {
      expect(asciiToGurmukhi('XkIN'), 'ਯਕੀਂ');
      expect(asciiToGurmukhi('ipRX'), 'ਪ੍ਰਿਯ');
      expect(asciiToGurmukhi('hX¤wiq'), 'ਹਯਾੱਤਿ');
      expect(asciiToGurmukhi('hXw¤iq'), 'ਹਯਾੱਤਿ');
      expect(asciiToGurmukhi('hmwXUM'), 'ਹਮਾਯੂੰ');
      expect(asciiToGurmukhi('BXuo'), 'ਭਯੋੁ');
      expect(asciiToGurmukhi('XkIn'), 'ਯਕੀਨ');
      expect(asciiToGurmukhi('mDÎ'), 'ਮਧ੍ਯ');
      expect(asciiToGurmukhi('ilKÎqy'), 'ਲਿਖ੍ਯਤੇ');
      expect(asciiToGurmukhi('mwnÎo'), 'ਮਾਨ੍ਯੋ');
      expect(asciiToGurmukhi('iBÎo'), 'ਭਿ੍ਯੋ');
      expect(asciiToGurmukhi('kIÎo'), 'ਕੀ੍ਯੋ');
      expect(asciiToGurmukhi('sÎwm'), 'ਸ੍ਯਾਮ');
      expect(asciiToGurmukhi('qÎwgÎo'), 'ਤ੍ਯਾਗ੍ਯੋ');
      expect(asciiToGurmukhi('jÎoN'), 'ਜ੍ਯੋਂ');
      expect(asciiToGurmukhi('nwmï'), 'ਨਾਮਯ');
      expect(asciiToGurmukhi('sunIïhu'), 'ਸੁਨੀਯਹੁ');
      expect(asciiToGurmukhi('AdyïM'), 'ਅਦੇਯੰ');
      expect(asciiToGurmukhi('kFïo'), 'ਕਢਯੋ');
      expect(asciiToGurmukhi('sïwm'), 'ਸਯਾਮ');
      expect(asciiToGurmukhi('idqïwidqî'), 'ਦਿਤਯਾਦਿਤ੍ਯ');
      expect(asciiToGurmukhi('qRsîo'), 'ਤ੍ਰਸ੍ਯੋ');
    });

    test('sant lipi yayya', () {
      expect(asciiToGurmukhi('XkIN', extensions: true), 'ਯਕੀਂ');
      expect(asciiToGurmukhi('ipRX', extensions: true), 'ਪ੍ਰਿਯ');
      expect(asciiToGurmukhi('hX¤wiq', extensions: true), 'ਹਯਾੱਤਿ');
      expect(asciiToGurmukhi('hXw¤iq', extensions: true), 'ਹਯਾੱਤਿ');
      expect(asciiToGurmukhi('hmwXUM', extensions: true), 'ਹਮਾਯੂੰ');
      expect(asciiToGurmukhi('BXuo', extensions: true), 'ਭਯੋੁ');
      expect(asciiToGurmukhi('XkIn', extensions: true), 'ਯਕੀਨ');
      expect(asciiToGurmukhi('mDÎ', extensions: true), 'ਮਧ꠳ਯ');
      expect(asciiToGurmukhi('ilKÎqy', extensions: true), 'ਲਿਖ꠳ਯਤੇ');
      expect(asciiToGurmukhi('mwnÎo', extensions: true), 'ਮਾਨ꠳ਯੋ');
      expect(asciiToGurmukhi('iBÎo', extensions: true), 'ਭਿ꠳ਯੋ');
      expect(asciiToGurmukhi('kIÎo', extensions: true), 'ਕੀ꠳ਯੋ');
      expect(asciiToGurmukhi('sÎwm', extensions: true), 'ਸ꠳ਯਾਮ');
      expect(asciiToGurmukhi('qÎwgÎo', extensions: true), 'ਤ꠳ਯਾਗ꠳ਯੋ');
      expect(asciiToGurmukhi('jÎoN', extensions: true), 'ਜ꠳ਯੋਂ');
      expect(asciiToGurmukhi('nwmï', extensions: true), 'ਨਾਮ꠴ਯ');
      expect(asciiToGurmukhi('sunIïhu', extensions: true), 'ਸੁਨੀ꠴ਯਹੁ');
      expect(asciiToGurmukhi('AdyïM', extensions: true), 'ਅਦੇ꠴ਯੰ');
      expect(asciiToGurmukhi('kFïo', extensions: true), 'ਕਢ꠴ਯੋ');
      expect(asciiToGurmukhi('sïwm', extensions: true), 'ਸ꠴ਯਾਮ');
      expect(asciiToGurmukhi('idqïwidqî', extensions: true), 'ਦਿਤ꠴ਯਾਦਿਤ꠵ਯ');
      expect(asciiToGurmukhi('qRsîo', extensions: true), 'ਤ੍ਰਸ꠵ਯੋ');
    });

    test('diacritic ordering', () {
      expect(asciiToGurmukhi('guoibMd'), 'ਗੋੁਬਿੰਦ');
      expect(asciiToGurmukhi('gouibMd'), 'ਗੋੁਬਿੰਦ');
      expect(asciiToGurmukhi('guoibµd'), 'ਗੋੁਬਿੰਦ');
      expect(asciiToGurmukhi('gouibµd'), 'ਗੋੁਬਿੰਦ');
      expect(asciiToGurmukhi('imil´o'), 'ਮਿਲੵਿੋ');
      expect(asciiToGurmukhi('imilo´'), 'ਮਿਲੵਿੋ');
      expect(asciiToGurmukhi('imiloÏ'), 'ਮਿਲੵਿੋ');
      expect(asciiToGurmukhi('imilÏo'), 'ਮਿਲੵਿੋ');
      expect(asciiToGurmukhi('\u0A2e\u0A3F\u0A32\u0A4B\u0A3F\u0A75'), 'ਮਿਲੵਿੋ');
      expect(asciiToGurmukhi('igHwn'), 'ਗ੍ਹਿਾਨ');
      expect(asciiToGurmukhi('igwHn'), 'ਗ੍ਹਿਾਨ');
      expect(asciiToGurmukhi('\u0A17\u0A3F\u0A4D\u0A39\u0A3E\u0A28'), 'ਗ੍ਹਿਾਨ');
      expect(asciiToGurmukhi('\u0A17\u0A3F\u0A3E\u0A4D\u0A39\u0A28'), 'ਗ੍ਹਿਾਨ');
      expect(asciiToGurmukhi('\u0A17\u0A3E\u0A3F\u0A4D\u0A39\u0A28'), 'ਗ੍ਹਿਾਨ');
      expect(asciiToGurmukhi('s®æyxI'), 'ਸ਼੍ਰੇਣੀ');
      expect(asciiToGurmukhi('S®yxI'), 'ਸ਼੍ਰੇਣੀ');
      expect(asciiToGurmukhi('SRyxI'), 'ਸ਼੍ਰੇਣੀ');
      expect(asciiToGurmukhi('SyRxI'), 'ਸ਼੍ਰੇਣੀ');
      expect(asciiToGurmukhi('sæRyxI'), 'ਸ਼੍ਰੇਣੀ');
      expect(asciiToGurmukhi('sRæyxI'), 'ਸ਼੍ਰੇਣੀ');
      expect(asciiToGurmukhi('syRæxI'), 'ਸ਼੍ਰੇਣੀ');
      expect(asciiToGurmukhi('joiqÏM'), 'ਜੋਤੵਿੰ');
      expect(asciiToGurmukhi('joiqMÏ'), 'ਜੋਤੵਿੰ');
      expect(asciiToGurmukhi('bisÏMq'), 'ਬਸੵਿੰਤ');
      expect(asciiToGurmukhi('bisMÏq'), 'ਬਸੵਿੰਤ');
    });

    test('sanitization', () {
      expect(asciiToGurmukhi('aou'), 'ਓੁ');
      expect(asciiToGurmukhi('auo'), 'ਓੁ');
      expect(asciiToGurmukhi('aoU'), 'ਓੂ');
      expect(asciiToGurmukhi('aUo'), 'ਓੂ');
      expect(asciiToGurmukhi('AW'), 'ਆਂ');
      expect(asciiToGurmukhi('ANw'), 'ਆਂ');
      expect(asciiToGurmukhi('AwN'), 'ਆਂ');
    });
  });
}
