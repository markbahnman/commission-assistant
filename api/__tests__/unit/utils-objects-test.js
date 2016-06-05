import {expect} from 'chai';
import {pickAndChoose} from '../../utils/objects';

describe('Object Utils', () => {
  describe('pickAndChoose', () => {
    it('should return an empty object if no matching data', () => {
      const data = {};
      const ifields = ['a'];
      const ofields = ['b'];

      const picked = pickAndChoose(data, ifields, ofields);
      expect(picked).to.be.empty;
    });

    it('should return just the fields with the requested keys', () => {
      const data = { 'a': 1234, 'c': 5678 };
      const ifields = ['a'];
      const ofields = ['b'];

      const picked = pickAndChoose(data, ifields, ofields);
      expect(picked).to.deep.equal({ b: 1234 });
    });
  });
});
