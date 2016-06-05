import test from 'ava';
import { app, createUser } from '../helpers/utils';
import { pickAndChoose } from '../../api/utils/objects';

test('pickAndChoose should return empty object if no matching data', t => {
  const data = {};
  const ifields = ['a'];
  const ofields = ['b'];

  const picked = pickAndChoose(data, ifields, ofields);
  t.same(picked, {});
});
