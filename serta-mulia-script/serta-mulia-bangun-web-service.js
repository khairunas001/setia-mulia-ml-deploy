// Memastikan kode respons adalah 201.
pm.test('response status code should have 201 value', () => {
    pm.response.to.have.status(201);
});

// Memastikan bahwa response body adalah object.
pm.test('response body should be an object', () => {
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.be.an('object');
});

// Memastikan response body memiliki data yang sesuai, di antaranya berikut.
pm.test('response body should have correct property and value', () => {
    // Memiliki properti ‘status’ dan memiliki nilai ‘success’.
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.ownProperty('status');
    pm.expect(responseJson.status).to.equals('success');
    
    // Memiliki properti ‘message’ dengan nilai ‘Model is predicted successfully.’ atau ‘Model is predicted successfully but under threshold.’
    const expectedMessage = responseJson.data.confidenceScore > 99 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture';
    pm.expect(responseJson).to.ownProperty('message');
    pm.expect(responseJson.message).to.equals(expectedMessage);
    
    // Memiliki properti ‘data’ dan berupa object.
    pm.expect(responseJson).to.ownProperty('data');
    pm.expect(responseJson.data).to.be.an('object');
});

// Terakhir, memastikan id yang dihasilkan tidak kosong.
pm.test('response body data should have id property and not equal to empty', () => {
    const responseJson = pm.response.json();
    const {data} = responseJson;
    pm.expect(data).to.ownProperty('id');
    pm.expect(data.noteId).to.not.equals('');
});