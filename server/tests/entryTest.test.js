/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import testData from './data/mockData';
import otherUserToken from './data/testToken';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;
let userToken = '';
let entryId = '';
describe('Entries test', () => {
  it('should be signup', (done) => {
    const user = testData[15];
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((error, res) => {
        userToken = res.body.data.token;
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('User created successfully!');
        done();
      });
  });
  it('should add an entry', (done) => {
    const entry = testData[8];

    chai.request(server)
      .post('/api/v2/entries')
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        entryId = res.body.data.id;
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('Entry successfully created');
        done();
      });
  });

  it('should add an entry', (done) => {
    const entry = testData[8];

    chai.request(server)
      .post('/api/v1/entries')
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        expect(res.body.error).to.equal('Incorrect Route');
        done();
      });
  });

  it('should not add an entry if user didnot signin', (done) => {
    const entry = testData[9];

    chai.request(server)
      .post('/api/v2/entries')
      .send(entry)
      .end((error, res) => {
        res.body.status.should.be.equal(401);
        expect(res.body.error).to.equal('Unauthorized access');
        done();
      });
  });

  it('should not add an entry provided invalid token', (done) => {
    const entry = testData[10];

    chai.request(server)
      .post('/api/v2/entries')
      .send(entry)
      .set('Authorization', 'Bearer undefined')
      .end((error, res) => {
        res.body.status.should.be.equal(401);
        expect(res.body.error).to.equal('Invalid token');
        done();
      });
  });

  it('should not add invalid input', (done) => {
    const entry = testData[11];

    chai.request(server)
      .post('/api/v2/entries')
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });

  it('should modify an entry', (done) => {
    const entry = testData[12];

    chai.request(server)
      .patch(`/api/v2/entries/${entryId}`)
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Entry successfully edited!');
        done();
      });
  });

  it('should not modify an entry of other users', (done) => {
    const entry = testData[13];

    chai.request(server)
      .patch(`/api/v2/entries/${entryId}`)
      .send(entry)
      .set('Authorization', `Bearer ${otherUserToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(403);
        expect(res.body.error).to.equal('Operation forbiden');
        done();
      });
  });

  it('should not modify an entry provided non-existing id', (done) => {
    chai.request(server)
      .patch('/api/v2/entries/29c713a0-ffca-11e9-b351-293cd06724c7')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('Entry not found');
        done();
      });
  });

  it('should not modify entry provided invalid input', (done) => {
    const entry = testData[14];

    chai.request(server)
      .patch(`/api/v2/entries/${entryId}`)
      .send(entry)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(400);
        done();
      });
  });

  it('should not delete an entry of other users', (done) => {
    chai.request(server)
      .delete(`/api/v2/entries/${entryId}`)
      .set('Authorization', `Bearer ${otherUserToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(403);
        expect(res.body.error).to.equal('Operation forbiden');
        done();
      });
  });

  it('should delete an entry', (done) => {
    chai.request(server)
      .delete(`/api/v2/entries/${entryId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Entry successfully deleted!');
        done();
      });
  });
  it('should not delete an entry provided non-existing id', (done) => {
    chai.request(server)
      .delete('/api/v2/entries/29c713a0-ffca-11e9-b351-293cd06724c7')
      .set('Authorization', `Bearer ${userToken}`)
      .end((error, res) => {
        res.body.status.should.be.equal(404);
        expect(res.body.error).to.equal('Entry not found');
        done();
      });
  });
});
