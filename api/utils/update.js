export default function update(model, id, data) {
  return new Promise((resolve, reject) => {
    model.findById(id)
    .then((result) => {
      result.update(data)
      .then((res) => {
        resolve({status: 200, success: true, result: res});
      }, err => reject({status: 500, success: false, error: 'Could not update'}));
    }, (err) => reject({status: 404, success: false, error: 'No such id'}));
  });
}
