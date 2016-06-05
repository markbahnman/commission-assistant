// TODO: unit tests
export function pick(o, ...fields) {
  const has = p => o.hasOwnProperty(p);
  let result = {};
  for (let f of fields) {
    if (has(f)) {
      result = Object.assign(result, {[f]: o[f]})
    }
  }

  return result;
}

function createMap(from, to) {
  let result = {};
  from.map((v, i) => {
    result[v] = to[i];
  });
  return result;
}

function applyMap(data, map) {
  let result = {};

  for (let v in data) {
    result[map[v]] = data[v];
  }

  return result;
}

export function pickAndChoose(o, ifields, ofields) {
  const map = createMap(ifields, ofields);
  const extracted = pick(o, ...ifields);
  const mappedData = applyMap(extracted, map);
  return mappedData;
}
